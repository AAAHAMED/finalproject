import React from 'react';

const GoodsTable = ({ entries }) => {
    return (
        <div>
            <h2>Goods Received Log</h2>
            <table>
                <thead>
                    <tr>
                        <th>Time Received</th>
                        <th>Goods Type</th>
                    </tr>
                </thead>
                <tbody>
                    {entries.map((entry, index) => (
                        <tr key={index}>
                            <td>{entry.time}</td>
                            <td>{entry.goodsType}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default GoodsTable;
