#!/usr/bin/env node

const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const fs = require('fs');
const path = require('path');

// Set FFmpeg path
ffmpeg.setFfmpegPath(ffmpegPath);

// Configuration
const config = {
  inputDir: 'public/videos',
  outputDir: 'public/videos',
  formats: [
    // Desktop versions - optimized for faster loading
    {
      extension: 'webm',
      codec: 'libvpx-vp9',
      suffix: '',
      options: {
        crf: 35,        // Higher CRF = smaller file (was 30)
        bitrate: '1.2M', // Reduced from 2M
        preset: 'slow'
      },
      maxWidth: 1920,
      maxHeight: 1080,
      framerate: 24     // Reduced from 30fps - fine for background videos
    },
    {
      extension: 'mp4',
      codec: 'libx264',
      suffix: '',
      options: {
        crf: 28,        // Higher CRF = smaller file (was 23)
        preset: 'medium',
        bitrate: '1.2M' // Reduced from 2M
      },
      maxWidth: 1920,
      maxHeight: 1080,
      framerate: 24     // Reduced from 30fps
    },
    // Mobile-optimized versions - aggressive compression
    {
      extension: 'webm',
      codec: 'libvpx-vp9',
      suffix: '-mobile',
      options: {
        crf: 40,        // Higher CRF (was 35)
        bitrate: '500k', // Reduced from 800k
        preset: 'fast'
      },
      maxWidth: 640,    // Reduced from 720
      maxHeight: 360,   // Reduced from 480
      framerate: 20     // Reduced from 24fps
    },
    {
      extension: 'mp4',
      codec: 'libx264',
      suffix: '-mobile',
      options: {
        crf: 32,        // Higher CRF (was 28)
        preset: 'fast',
        bitrate: '500k' // Reduced from 800k
      },
      maxWidth: 640,    // Reduced from 720
      maxHeight: 360,   // Reduced from 480
      framerate: 20     // Reduced from 24fps
    }
  ]
};

/**
 * Ensure output directory exists
 */
function ensureOutputDir() {
  if (!fs.existsSync(config.outputDir)) {
    fs.mkdirSync(config.outputDir, { recursive: true });
    console.log(`📁 Created output directory: ${config.outputDir}`);
  }
}

/**
 * Get all video files from input directory
 */
function getVideoFiles() {
  if (!fs.existsSync(config.inputDir)) {
    console.error(`❌ Input directory not found: ${config.inputDir}`);
    return [];
  }

  const files = fs.readdirSync(config.inputDir);
  const videoExtensions = ['.mp4', '.mov', '.avi', '.mkv', '.webm'];
  
  return files.filter(file => 
    videoExtensions.some(ext => 
      file.toLowerCase().endsWith(ext)
    )
  );
}

/**
 * Get optimized filename
 */
function getOptimizedFilename(originalFile, format) {
  const basename = path.parse(originalFile).name;
  // Create shorter, web-friendly filename
  const shortName = basename
    .replace(/social_navadrian_detailed_blueprint_of_an_electric_vehicle_battery_s_.*?_/, 'battery-blueprint-')
    .replace(/[^a-zA-Z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  return `${shortName}${format.suffix}.${format.extension}`;
}

/**
 * Generate poster image from video
 */
function generatePosterImage(inputFile) {
  return new Promise((resolve, reject) => {
    const inputPath = path.join(config.inputDir, inputFile);
    const basename = path.parse(inputFile).name;
    const shortName = basename
      .replace(/social_navadrian_detailed_blueprint_of_an_electric_vehicle_battery_s_.*?_/, 'battery-blueprint-')
      .replace(/[^a-zA-Z0-9-]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    const posterPath = path.join('public/images', `${shortName}-poster.jpg`);

    console.log(`📸 Generating poster: ${inputFile} → ${shortName}-poster.jpg`);

    ffmpeg(inputPath)
      .seekInput(1) // Take frame at 1 second (in case video is short)
      .frames(1)
      .format('image2')
      .outputOptions([
        '-q:v 2', // High quality JPEG
        `-vf scale=w='min(1920,iw)':h='min(1080,ih)':force_original_aspect_ratio=decrease`
      ])
      .on('end', () => {
        console.log(`   ✅ Poster generated: ${shortName}-poster.jpg`);
        resolve(posterPath);
      })
      .on('error', (err) => {
        console.log(`   ❌ Error generating poster:`, err.message);
        reject(err);
      })
      .save(posterPath);
  });
}

/**
 * Compress a single video
 */
function compressVideo(inputFile, format) {
  return new Promise((resolve, reject) => {
    const inputPath = path.join(config.inputDir, inputFile);
    const outputFilename = getOptimizedFilename(inputFile, format);
    const outputPath = path.join(config.outputDir, outputFilename);

    console.log(`🎬 Processing: ${inputFile} → ${outputFilename}`);

    // Scale filter that maintains aspect ratio without adding black bars
    // Also ensures even dimensions (required for h264)
    const scaleFilter = `scale=w='min(${format.maxWidth},iw)':h='min(${format.maxHeight},ih)':force_original_aspect_ratio=decrease,scale=trunc(iw/2)*2:trunc(ih/2)*2`;

    let command = ffmpeg(inputPath)
      .videoCodec(format.codec)
      .fps(format.framerate)
      .noAudio() // Remove audio for background videos
      .outputOptions([`-vf`, scaleFilter]);

    // Apply format-specific options
    if (format.extension === 'webm') {
      command = command
        .addOption('-crf', format.options.crf)
        .addOption('-b:v', format.options.bitrate)
        .addOption('-speed', '2') // Faster encoding
        .addOption('-tile-columns', '2')
        .addOption('-frame-parallel', '1');
    } else if (format.extension === 'mp4') {
      command = command
        .addOption('-crf', format.options.crf)
        .addOption('-preset', format.options.preset)
        .addOption('-movflags', '+faststart') // Web streaming optimization
        .addOption('-pix_fmt', 'yuv420p'); // Better compatibility
    }

    command
      .on('start', (commandLine) => {
        console.log(`   🔧 Command: ${commandLine.substring(0, 100)}...`);
      })
      .on('progress', (progress) => {
        if (progress.percent) {
          process.stdout.write(`\r   ⏳ Progress: ${Math.round(progress.percent)}%`);
        }
      })
      .on('end', () => {
        console.log(`\n   ✅ Completed: ${outputFilename}`);
        
        // Get file sizes for comparison
        const inputSize = fs.statSync(inputPath).size;
        const outputSize = fs.statSync(outputPath).size;
        const reduction = ((inputSize - outputSize) / inputSize * 100).toFixed(1);
        
        console.log(`   📊 Size: ${(inputSize/1024/1024).toFixed(1)}MB → ${(outputSize/1024/1024).toFixed(1)}MB (${reduction}% reduction)`);
        
        resolve({ inputFile, outputFilename, inputSize, outputSize, reduction });
      })
      .on('error', (err) => {
        console.log(`\n   ❌ Error processing ${inputFile}:`, err.message);
        reject(err);
      })
      .save(outputPath);
  });
}

/**
 * Main compression function
 */
async function compressAllVideos() {
  console.log('🎥 Starting video compression...\n');
  
  ensureOutputDir();
  
  const videoFiles = getVideoFiles();
  
  if (videoFiles.length === 0) {
    console.log('❌ No video files found in the input directory.');
    return;
  }

  console.log(`📋 Found ${videoFiles.length} video file(s):`);
  videoFiles.forEach(file => console.log(`   - ${file}`));
  console.log('');

  const results = [];

  for (const videoFile of videoFiles) {
    console.log(`🎬 Processing: ${videoFile}`);

    // Generate poster image first
    try {
      await generatePosterImage(videoFile);
    } catch (error) {
      console.error(`❌ Failed to generate poster for ${videoFile}:`, error.message);
    }

    for (const format of config.formats) {
      try {
        const result = await compressVideo(videoFile, format);
        results.push(result);
      } catch (error) {
        console.error(`❌ Failed to compress ${videoFile} to ${format.extension}:`, error.message);
      }
    }
    console.log('');
  }

  // Summary
  console.log('📊 Compression Summary:');
  console.log('========================');
  
  let totalInputSize = 0;
  let totalOutputSize = 0;
  
  results.forEach(result => {
    console.log(`${result.outputFilename}: ${result.reduction}% reduction`);
    totalInputSize += result.inputSize;
    totalOutputSize += result.outputSize;
  });
  
  const totalReduction = ((totalInputSize - totalOutputSize) / totalInputSize * 100).toFixed(1);
  console.log(`\nTotal: ${(totalInputSize/1024/1024).toFixed(1)}MB → ${(totalOutputSize/1024/1024).toFixed(1)}MB (${totalReduction}% reduction)`);
  console.log('\n✅ Video compression completed!');
  
  // Generate usage instructions
  if (results.length > 0) {
    console.log('\n📝 Usage in your React component:');
    console.log('================================');
    const webmFile = results.find(r => r.outputFilename.endsWith('.webm'))?.outputFilename;
    const mp4File = results.find(r => r.outputFilename.endsWith('.mp4'))?.outputFilename;
    
    if (webmFile && mp4File) {
      console.log(`<video autoPlay muted loop playsInline className="...">
  <source src="/videos/${webmFile}" type="video/webm" />
  <source src="/videos/${mp4File}" type="video/mp4" />
</video>`);
    }
  }
}

// Run if called directly
if (require.main === module) {
  compressAllVideos().catch(console.error);
}

module.exports = { compressAllVideos, config };
