"use client";

import Image from "next/image";
import { useState } from "react";
import UpdateScoreModal from "./components/UpdateScoreModal";
import ComparisonGraph from "./components/ComparisonGraph";
import QuestionAnalysisGraph from "./components/QuestionAnalysisGraph";

export default function Home() {
  const [isUpdateModal, setIsUpdateModal] = useState(false);
  const [rank, setRank] = useState(2);
  const [percentile, setPercentile] = useState(70);
  const [correctAns, setCorrectAns] = useState(11);

  const handleModalSave = (data) => {
    const { rank, percentile, currentScore } = data;
    setRank(rank);
    setPercentile(percentile);
    setCorrectAns(currentScore);
    setIsUpdateModal(false);
  };

  const handleModalClose = () => {
    setIsUpdateModal(false);
  };

  return (
    <>
      <h1 className="text-sm sm:text-base md:text-lg text-gray-500 mb-4">Skill Test</h1>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <div className="space-y-4">

          {/* Test Card */}
          <div className="gap-4 p-5 sm:p-7 bg-white rounded-xl flex flex-col sm:flex-row sm:items-center justify-between border border-gray-200 text-sm">
            <div className="flex gap-4 items-center">
              <Image
                src="/html_logo.png"
                alt="HTML Logo"
                width={55}
                height={55}
              />
              <div className="flex-col space-y-1">
                <h1 className="font-bold">Hyper Text Markup Language</h1>
                <p className="text-gray-600">
                  Question: 8 | Duration: 15 mins | Submitted on 5 June 2021
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsUpdateModal(!isUpdateModal)}
              className="mt-4 sm:mt-0 px-7 py-2 rounded-xl text-white bg-blue-900 font-semibold cursor-pointer hover:bg-blue-950"
            >
              Update
            </button>
          </div>

          {isUpdateModal && (
            <UpdateScoreModal
              rank={rank}
              percentile={percentile}
              correctAns={correctAns}
              onClose={handleModalClose}
              onSave={handleModalSave}
            />
          )}

          {/* Quick Stats */}
          <div className="p-5 sm:p-7 bg-white rounded-xl border border-gray-200 space-y-4">
            <h1 className="text-sm font-semibold">Quick Statistics</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
              {[
                {
                  icon: "/trophy.webp",
                  label: "YOUR RANK",
                  value: rank,
                },
                {
                  icon: "/percentile.png",
                  label: "PERCENTILE",
                  value: `${percentile}%`,
                },
                {
                  icon: "/correct.png",
                  label: "CORRECT ANSWER",
                  value: correctAns,
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row items-center sm:items-start gap-3 bg-gray-50 rounded-lg p-4 text-center sm:text-left"
                >
                  {/* Image Section */}
                  <div className="rounded-full bg-gray-100 p-3 w-12 h-12 flex items-center justify-center">
                    <img src={item.icon} alt={item.label} className="w-6 h-6 object-contain" />
                  </div>

                  {/* Value & Label */}
                  <div>
                    <p className="font-bold text-base">{item.value}</p>
                    <p className="text-gray-500 text-xs">{item.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>


          <ComparisonGraph userPercentile={percentile} />
        </div>

        {/* Syllabus Analysis */}
        <div className="space-y-4">
          <div className="p-5 sm:p-7 bg-white rounded-xl border border-gray-200 space-y-6 text-sm">
            <h1 className="font-bold">Syllabus Wise Analysis</h1>

            {[
              {
                label: "HTML Tools, Forms, History",
                color: "blue",
                percent: 80,
              },
              {
                label: "Tags & References in HTML",
                color: "orange",
                percent: 60,
              },
              {
                label: "Tables & References in HTML",
                color: "red",
                percent: 24,
              },
              {
                label: "Tables & CSS Basics",
                color: "green",
                percent: 96,
              },
            ].map((item, idx) => {
              const bgBase = {
                blue: "bg-blue-100",
                orange: "bg-orange-100",
                red: "bg-red-100",
                green: "bg-green-100",
              };

              const bgFill = {
                blue: "bg-blue-500",
                orange: "bg-orange-500",
                red: "bg-red-500",
                green: "bg-green-500",
              };

              const textColor = {
                blue: "text-blue-600",
                orange: "text-orange-600",
                red: "text-red-600",
                green: "text-green-600",
              };

              return (
                <div key={idx}>
                  <label>{item.label}</label>
                  <div className="flex items-center gap-2 mt-1">
                    <div className={`w-full h-2 ${bgBase[item.color]} rounded relative`}>
                      <div
                        className={`h-2 ${bgFill[item.color]} rounded`}
                        style={{ width: `${item.percent}%` }}
                      ></div>
                    </div>
                    <span
                      className={`text-sm font-semibold ${textColor[item.color]} w-12 text-right`}
                    >
                      {item.percent}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>


          <QuestionAnalysisGraph score={correctAns} />
        </div>
      </div>
    </>
  );
}
