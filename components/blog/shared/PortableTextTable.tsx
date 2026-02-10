'use client'

interface TableRow {
    _key: string
    cells: string[]
}

interface TableValue {
    rows: TableRow[]
}

export default function PortableTextTable({ value }: { value: TableValue }) {
    if (!value?.rows?.length) {
        return null
    }

    const [headerRow, ...bodyRows] = value.rows

    return (
        <div className="my-8 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
                <thead>
                    <tr className="border-b-2 border-primary/30 bg-muted/50">
                        {headerRow.cells.map((cell, i) => (
                            <th
                                key={i}
                                className="px-4 py-3 text-left font-semibold text-foreground"
                            >
                                {cell}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {bodyRows.map((row) => (
                        <tr
                            key={row._key}
                            className="border-b border-border hover:bg-muted/30 transition-colors"
                        >
                            {row.cells.map((cell, i) => (
                                <td
                                    key={i}
                                    className="px-4 py-3 text-muted-foreground"
                                >
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

