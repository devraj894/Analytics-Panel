"use client";

import React from "react";
import { Box } from "@mui/material";

const QuestionAnalysisGraph = ({ score }) => {
    const total = 15;
    const percentage = (score / total) * 100;
    const radius = 70;
    const stroke = 20; 
    const normalizedRadius = radius - stroke / 2;
    const circumference = 2 * Math.PI * normalizedRadius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <div className="p-7 bg-white rounded-xl items-center border border-gray-200 text-sm space-y-11">
            <div className="space-y-3">
                <div className="flex justify-between">
                    <h1 className="font-bold">Question Analysis</h1>
                    <span className="font-bold text-blue-700">{score}/15</span>
                </div>
                <p>
                    <span className="font-bold text-gray-600">
                        You scored {score} question correct out of 15.
                    </span>{" "}
                    However it still<br/>needs some improvements
                </p>
            </div>

            {/* Centered Graph */}
            <div className="flex justify-center items-center">
                <Box position="relative" width={radius * 2} height={radius * 2}>
                    <svg width={radius * 2} height={radius * 2}>
                        {/* Background Circle */}
                        <circle
                            stroke="#BBDEFB"
                            fill="transparent"
                            strokeWidth={stroke}
                            r={normalizedRadius}
                            cx={radius}
                            cy={radius}
                        />
                        {/* Foreground Circle with Animation */}
                        <circle
                            stroke="#2962FF"
                            fill="transparent"
                            strokeWidth={stroke}
                            r={normalizedRadius}
                            cx={radius}
                            cy={radius}
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="round"
                            transform={`rotate(-90 ${radius} ${radius})`}
                            style={{
                                transition: "stroke-dashoffset 1s ease-out",
                            }}
                        />
                    </svg>

                    {/* Center Image */}
                    <Box
                        position="absolute"
                        top="50%"
                        left="50%"
                        sx={{
                            transform: "translate(-50%, -50%)",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <img src="/center-icon.png" alt="center" width={40} height={40} />
                    </Box>
                </Box>
            </div>
        </div>
    );
};

export default QuestionAnalysisGraph;