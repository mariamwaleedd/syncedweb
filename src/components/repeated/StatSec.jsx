import React from 'react';

const StatsSec = ({ stats }) => {
    return (
        <section className="f-section">
            <div className="stats-v2-bar">
                {stats.map((s, i) => {
                    const parts = s.split(':');
                    const value = parts[0];
                    const label = parts[1];
                    return (
                        <div className="stat-v2-box" key={i}>
                            <h4>{value}</h4>
                            <p>{label}</p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default StatsSec;