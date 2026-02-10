import {
    Battery, Zap, Shield, TrendingUp, Recycle, Brain, BarChart3, Users, Cpu, Database, RefreshCw
} from 'lucide-react'
import { ChartData, ChartOptions } from 'chart.js';

export interface ChartConfig {
    type: 'Bar' | 'Line' | 'Doughnut' | 'Funnel';
    data: ChartData<any, any, any>;
    options?: ChartOptions<any>;
}

export const chartData: ChartConfig[] = [
    {
        type: 'Bar',
        data: {
            labels: ['MY2011', 'MY2012', 'MY2013', 'MY2014', 'MY2015', 'MY2016', 'MY2017', 'MY2018', 'MY2019', 'MY2020', 'MY2021', 'MY2022'],
            datasets: [
                {
                    label: 'EV Claims',
                    data: [0.2, 0.5, 2.2, 2.3, 3.7, 5.2, 6.8, 18.8, 15.7, 23.2, 21.1, 0.3],
                    backgroundColor: 'hsl(37 100% 48%)',
                    borderColor: 'hsl(37 100% 48%)',
                    borderWidth: 1
                },
                {
                    label: 'Non-EV Claims',
                    data: [3.6, 4.5, 5.5, 6.1, 7.2, 7.5, 8.2, 7.7, 7.9, 6.4, 3.9, 0.2],
                    backgroundColor: 'hsl(0 0% 100%)',
                    borderColor: 'hsl(0 0% 100%)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'EV vs Non-EV Claims by Model Year',
                    font: { size: 12, weight: 'normal' }
                },
                subtitle: {
                    display: true,
                    text: 'Source: CCC Intelligent Insights, (2022), Electric vs ICE Vehicles: Unpacking Repair Cost Impacts',
                    font: { size: 10, style: 'italic', weight: 'normal' },
                    color: 'hsl(0 0% 60%)',
                    padding: { top: 4 }
                },
                legend: { display: true, position: 'top' },
                datalabels: { display: false }
            },
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            scales: {
                x: { beginAtZero: true, max: 25 },
                y: { grid: { display: false } }
            }
        }
    },
    {
        type: 'Line',
        data: {
            labels: [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
            datasets: [{
                label: 'Battery Capacity (%)',
                data: [100, 97, 96, 94.8, 93, 91, 89, 87, 86, 75, 70],
                borderColor: 'hsl(37 100% 48%)',
                backgroundColor: 'hsl(37 100% 48% / 0.2)',
                tension: 0.3,
                fill: true,
                borderWidth: 2,
                pointRadius: 3,
                pointHoverRadius: 5
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Battery Capacity vs. Cycles Showing Capacity Cliff',
                    font: { size: 12, weight: 'normal' }
                },
                subtitle: {
                    display: true,
                    text: 'Source: Fawkes Energy internal analysis, 2025',
                    font: { size: 10, style: 'italic', weight: 'normal' },
                    color: 'hsl(0 0% 60%)',
                    padding: { top: 4 }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Charge Cycles',
                        color: 'hsl(0 0% 85%)'
                    },
                    ticks: {
                        color: 'hsl(0 0% 70%)',
                        maxTicksLimit: 6
                    }
                },
                y: {
                    beginAtZero: false,
                    min: 60,
                    max: 105,
                    title: {
                        display: true,
                        text: 'Battery Capacity (%)',
                        color: 'hsl(0 0% 85%)'
                    },
                    ticks: {
                        color: 'hsl(0 0% 70%)'
                    }
                }
            }
        }
    },
    {
        type: 'Line',
        data: {
            labels: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'],
            datasets: [
                {
                    label: 'Without Battery Intelligence',
                    data: [60, 70, 80, 85, 90],
                    borderColor: 'hsl(0 60% 50%)',
                    backgroundColor: 'hsl(0 60% 50% / 0.2)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 2,
                    pointRadius: 3,
                    pointHoverRadius: 5
                },
                {
                    label: 'With Battery Intelligence',
                    data: [40, 42, 45, 48, 50],
                    borderColor: 'hsl(150 70% 45%)',
                    backgroundColor: 'hsl(150 70% 45% / 0.2)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 2,
                    pointRadius: 3,
                    pointHoverRadius: 5
                }
            ]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Financing Risk Over Time: With vs Without Battery Data',
                    font: { size: 12, weight: 'normal' }
                },
                subtitle: {
                    display: true,
                    text: 'Source: Fawkes Energy internal analysis, 2025',
                    font: { size: 10, style: 'italic', weight: 'normal' },
                    color: 'hsl(0 0% 60%)',
                    padding: { top: 4 }
                },
                legend: {
                    display: true,
                    position: 'top'
                },
                datalabels: { display: false }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Vehicle Age',
                        color: 'hsl(0 0% 85%)'
                    },
                    ticks: {
                        color: 'hsl(0 0% 70%)',
                        maxTicksLimit: 6
                    },
                    grid: {
                        color: 'hsl(0 0% 20% / 0.3)'
                    }
                },
                y: {
                    beginAtZero: true,
                    min: 0,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Risk Level (%)',
                        color: 'hsl(0 0% 85%)'
                    },
                    ticks: {
                        color: 'hsl(0 0% 70%)',
                        callback: function (value: any) {
                            return value + '%';
                        }
                    },
                    grid: {
                        color: 'hsl(0 0% 20% / 0.3)'
                    }
                }
            }
        }
    },
    {
        type: 'Doughnut',
        data: {
            labels: ['Informally processed', 'Formally recycled'],
            datasets: [{
                data: [99, 1],
                backgroundColor: ['hsl(37 100% 48%)', 'hsl(150 70% 45%)'],
                borderWidth: 0
            }]
        },
        options: {
            rotation: 45, // Rotate chart so 1% slice appears at ~45° from top
            plugins: {
                title: {
                    display: true,
                    text: 'EV LiB Processing Split in India',
                    font: { size: 12, weight: 'normal' },
                    padding: { top: 0, bottom: 20 }
                },
                subtitle: {
                    display: true,
                    text: 'Source: ICEA-Accenture, (2025); Pathways to Circular Economy in Indian Electronics Sector',
                    font: { size: 10, style: 'italic', weight: 'normal' },
                    color: 'hsl(0 0% 60%)',
                    padding: { top: 4 }
                },
                legend: { position: 'bottom' },
                datalabels: {
                    display: true,
                    color: 'hsl(0 0% 100%)',
                    font: {
                        size: 12,
                        weight: 'bold'
                    },
                    formatter: (value: number, context: any) => {
                        return `${value}%`;
                    },
                    anchor: (context: any) => {
                        // Show 1% outside with leader line, 99% inside
                        return context.dataIndex === 1 ? 'end' : 'center';
                    },
                    align: (context: any) => {
                        return context.dataIndex === 1 ? 'end' : 'center';
                    },
                    offset: (context: any) => {
                        return context.dataIndex === 1 ? 15 : 0;
                    },
                    clamp: false
                }
            },
            cutout: '60%'
        }
    },
    {
        type: 'Line',
        data: {
            labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
            datasets: [
                {
                    label: 'Predictive',
                    data: [8, 12.5, 14, 16, 17.5, 19, 21, 21.5, 22, 24, 24.5, 25],
                    borderColor: 'hsl(37 100% 48%)',
                    backgroundColor: 'hsl(37 100% 48% / 0.2)',
                    tension: 0.3,
                    fill: true,
                    borderWidth: 2,
                    pointRadius: 2,
                    pointHoverRadius: 4
                },
                {
                    label: 'Reactive',
                    data: [1.5, 2.2, 5.8, 5, 4.8, 6.2, 3.5, 4.5, 8.5, 7.5, 6.2, 9],
                    borderColor: 'hsl(0 0% 80%)',
                    backgroundColor: 'hsl(0 0% 80% / 0.2)',
                    tension: 0.3,
                    fill: true,
                    borderWidth: 2,
                    pointRadius: 2,
                    pointHoverRadius: 4
                }
            ]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'ROI: Predictive vs Reactive Maintenance Over Time',
                    font: { size: 12, weight: 'normal' }
                },
                subtitle: {
                    display: true,
                    text: 'Source: Fawkes Energy internal analysis, 2025',
                    font: { size: 10, style: 'italic', weight: 'normal' },
                    color: 'hsl(0 0% 60%)',
                    padding: { top: 4 }
                },
                datalabels: { display: false }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Months Since Deployment',
                        color: 'hsl(0 0% 85%)'
                    },
                    ticks: { color: 'hsl(0 0% 70%)' },
                    grid: { color: 'hsl(0 0% 20% / 0.3)' }
                },
                y: {
                    beginAtZero: true,
                    min: 0,
                    max: 26,
                    title: {
                        display: true,
                        text: 'ROI Index',
                        color: 'hsl(0 0% 85%)'
                    },
                    ticks: { color: 'hsl(0 0% 70%)' },
                    grid: { color: 'hsl(0 0% 20% / 0.3)' }
                }
            }
        }
    },
    {
        type: 'Line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
                {
                    label: 'Charging Commissions Revenue',
                    data: [45, 48, 52, 55, 58, 62, 65, 68, 71, 74, 77, 80],
                    borderColor: 'hsl(37 100% 48%)',
                    backgroundColor: 'hsl(37 100% 48% / 0.2)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    pointStyle: 'circle'
                },
                {
                    label: 'Total Revenue with Battery Health Reports',
                    data: [null, null, null, null, null, 62, 72, 80, 89, 97, 106, 115],
                    borderColor: 'hsl(150 70% 45%)',
                    backgroundColor: 'hsl(150 70% 45% / 0.2)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    pointStyle: 'circle'
                }
            ]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Revenue Growth with Battery Health Reports Introduced Mid-Year',
                    font: { size: 12, weight: 'normal' }
                },
                subtitle: {
                    display: true,
                    text: 'Source: Fawkes Energy internal analysis, 2025',
                    font: { size: 10, style: 'italic', weight: 'normal' },
                    color: 'hsl(0 0% 60%)',
                    padding: { top: 4 }
                },
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 12,
                        font: {
                            size: 12
                        }
                    }
                },
                annotation: {
                    annotations: {
                        line1: {
                            type: 'line' as const,
                            xMin: 5,
                            xMax: 5,
                            borderColor: 'hsl(0 0% 60%)',
                            borderWidth: 2,
                            borderDash: [5, 5],
                            label: {
                                display: true,
                                content: 'Battery Reports Introduced',
                                position: 'start' as const,
                                backgroundColor: 'hsl(0 0% 20%)',
                                color: 'hsl(0 0% 85%)',
                                font: {
                                    size: 10
                                },
                                padding: {
                                    x: 8,
                                    y: 4
                                }
                            }
                        }
                    }
                },
                datalabels: { display: false }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Month',
                        color: 'hsl(0 0% 85%)'
                    },
                    ticks: {
                        color: 'hsl(0 0% 70%)',
                        font: {
                            family: 'Inter, sans-serif'
                        }
                    },
                    grid: {
                        color: 'hsl(0 0% 20% / 0.6)'
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Revenue ($K)',
                        color: 'hsl(0 0% 85%)'
                    },
                    ticks: {
                        color: 'hsl(0 0% 70%)',
                        font: {
                            family: 'Inter, sans-serif'
                        },
                        callback: function (value: any) {
                            return '$' + value + 'K';
                        }
                    },
                    grid: {
                        color: 'hsl(0 0% 20% / 0.6)'
                    }
                }
            }
        }
    }
];

export const chartSources = [
    'Source: CCC Intelligent Insights, (2022), Electric vs ICE Vehicles: Unpacking Repair Cost Impacts',
    'Source: Fawkes Energy internal analysis, 2025',
    'Source: Fawkes Energy internal analysis, 2025',
    'Source: ICEA-Accenture, (2025); Pathways to Circular Economy in Indian Electronics Sector',
    'Source: Fawkes Energy internal analysis, 2025',
    'Source: Fawkes Energy internal analysis, 2025'
];

export const painPointsData = [
    {
        title: 'EV OEMs',
        subtitle: 'Insurance Claims & Warranty Risk',
        keyInsight: 'Recent U.S. data shows a sharp rise in EV insurance claims, driven largely by the vulnerability of batteries to damage. Without deeper visibility into battery health and intelligence, managing this risk remains a significant challenge.',
        dataPoint: 'Insurance premiums are 26% higher for EVs than ICE vehicles',
        source: 'Euromonitor, CCC Report',
        painPoints: [
            'High warranty and recall costs due to unpredictable battery failures',
            'Slow R&D cycles from a lack of real-world performance data',
            'Reputational damage from battery-related safety incidents',
            'Insufficient insight into battery health complicates assessing and managing risk'
        ]
    },
    {
        title: 'Fleet Operators',
        subtitle: 'Capacity Cliffs & Downtime Risk',
        keyInsight: 'Lithium-ion batteries don\'t always degrade gradually; sometimes they face abrupt "capacity cliffs," with losses of up to 20% in just a few charge cycles. This sudden drop can cause unexpected range loss or vehicle downtime, creating major risks for EV fleets.',
        dataPoint: 'Up to 20% capacity loss in just a few charge cycles',
        source: 'Battery degradation studies',
        painPoints: [
            'Unexpected vehicle downtime impacting operations and revenue',
            'Suboptimal charging strategies leading to accelerated battery degradation',
            'Uncertainty in vehicle residual values due to unknown battery health',
            'Abrupt capacity cliffs leading to significant loss in capacity in limited charging cycles'
        ]
    },
    {
        title: 'Financiers',
        subtitle: 'EV Financing Lifecycle Challenges',
        keyInsight: 'EV financing costs 26% more than ICE vehicles due to higher insurance premiums, uncertain residual values, and lack of battery health data. Traditional financing models fail to account for battery degradation patterns, leading to higher interest rates and limited credit availability.',
        dataPoint: 'EV interest rates 26% higher than ICE vehicles in India',
        source: 'ADB, BCG, Niti Aayog Report',
        painPoints: [
            'Lack of high-quality battery data and diagnostics',
            'Limited data transparency affecting risk assessment accuracy',
            'Inability to predict or quantify premature battery degradation',
            'Inadequate ICE-based risk models for evaluating EV performance and value',
            'Difficulty in assessing resale/ residual value'
        ]
    },
    {
        title: 'Recyclers',
        subtitle: 'Circular Economy Potential',
        keyInsight: 'According to a recent ICEA–Accenture report, India could build a $3.5 billion domestic circular battery economy by 2030, driven by EVs and energy storage. Achieving this potential depends on reliable battery diagnostics. Without accurate data, batteries risk being diverted into informal, low-value processing instead of powering high-value reuse and recycling.',
        dataPoint: '$3.5 billion circular battery economy potential by 2030',
        source: 'ICEA–Accenture Report',
        painPoints: [
            'Lack of standardized battery health assessment protocols',
            'Risk of batteries entering informal, low-value processing chains',
            'Inability to optimize recycling processes without battery intelligence',
            'Inaccurate State-of-Health (SOH) data leading to undervalued assets',
            'Contamination risks from improperly handled high-voltage batteries',
            'Inefficient sorting processes for second-life applications vs. raw material recovery'
        ]
    },
    {
        title: 'BESS Developers',
        subtitle: 'Predictive Maintenance Challenges',
        keyInsight: 'For BESS developers, predictive maintenance enables early fault detection, reducing downtime, lowering costs, and improving ROI over time. But this is only possible with advanced battery intelligence. Without it, operators are stuck with reactive maintenance, driving up costs and operational risks.',
        dataPoint: 'Predictive maintenance can reduce costs by 20-30%',
        source: 'Energy storage studies',
        painPoints: [
            'Predictive insights enable early fault detection before failures occur',
            'Reduced system downtime through proactive maintenance scheduling',
            'Lower maintenance costs by preventing unplanned reactive repairs',
            'Improved ROI over time via optimized maintenance and uptime',
            'Requires advanced battery intelligence to realize these benefits',
            'Reactive maintenance drives higher costs and operational risks'
        ]
    },
    {
        title: 'CPOs',
        subtitle: 'Charging Infrastructure Optimization',
        keyInsight: 'In a cost-heavy ecosystem, CPOs can create new revenue streams by offering data-driven services like downloadable Battery State of Health (SoH) reports after each charge. This transforms routine charging into a premium, insight-driven experience, boosting customer trust, loyalty, and retention while improving charger utilization, offsetting operational costs, and driving long-term profitability.',
        dataPoint: 'Optimized charging can extend battery life by 15-25%',
        source: 'Charging infrastructure studies',
        painPoints: [
            'Suboptimal charging strategies affecting customer satisfaction',
            'Inability to predict and prevent charging infrastructure failures',
            'Limited insights into customer battery health and charging patterns'
        ]
    }
];

export const painPoints = painPointsData.map(data => data.painPoints);

export const products = [
    {
        name: "FawkesLink",
        description: "Our universal hardware interface plugs into any battery system, capturing high-fidelity data in real-time.",
        iconName: 'Zap',
    },
    {
        name: "FawkesCore",
        description: "The AI-powered brain of our platform. It processes data to deliver predictive analytics, state-of-health monitoring, and optimization strategies.",
        iconName: 'Brain',
    },
    {
        name: "FawkesLoop",
        description: "A data-driven marketplace connecting end-of-life batteries with second-life applications and certified recyclers, closing the loop.",
        iconName: 'RefreshCw',
    },
    {
        name: "FawkesArc",
        description: "A design and simulation tool for BESS manufacturers to design battery storage systems and analyze their performance, health, and techno-economics.",
        iconName: 'Target',
    },
];

export const differentiators = [
    { title: "Physics-Based AI", description: "Models grounded in electrochemical reality, not just correlation.", iconName: 'Cpu' },
    { title: "Real-World Data", description: "Calibrated with empirical data from millions of battery cycles.", iconName: 'Database' },
    { title: "Hardware Agnostic", description: "Universal compatibility across battery types, chemistries, and manufacturers.", iconName: 'Battery' },
];

export const teamMembers = [
    { name: 'Medha Ajay', role: 'Brand and Venture Strategist' },
    { name: 'Mohammed Suffiyan', role: 'Lead - Battery System Engineering' },
    { name: 'Sunil Sheth', role: 'Technical Product Manager' },
    { name: 'Kusumanjali D', role: 'Vendor & Compliance Manager' },
    { name: 'Abhishek Sharma', role: 'Hardware Engineer' },
    { name: 'Priyanka LK', role: 'Data Analyst' }
];
