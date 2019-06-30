import React from 'react';
import './style.css';

function Topics(props) {
    return (
        <div>
            <div className="topics-title">
                <h1>Hot Topics</h1>
            </div>
            <div className="top-topics">
                <ul>
                    {props.post.map(item => (
                        <div key={item.id}>
                            <h3>{item.title}</h3><br /><br />{item.body}<hr />
                        </div>
                    ))}
                </ul>

            </div>
        </div>
    )
}

export default Topics;