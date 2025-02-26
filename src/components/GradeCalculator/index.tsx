'use client';

import { useContext, useState } from 'react';
import { GradeCalculatorContext } from 'src/contexts/GradeCalculatorContext';
import toFixed from 'src/utils/toFixed';

interface GradeCalculatorProps {
  examGrade: number;
  weight: number;
  minGrade: number;
}

const GradeCalculator: React.FC<GradeCalculatorProps> = ({ examGrade, weight, minGrade }) => {
  const MAX_GRADE = 20;

  const [exam, setExam] = useState<number | null>((examGrade * MAX_GRADE) / 100);
  const [tooltipVisible, setTooltipVisible] = useState<boolean>(false);

  const { frequency, setFrequency } = useContext(GradeCalculatorContext);

  const finalGrade =
    !frequency || !exam ? null : toFixed(frequency * (1 - weight) + exam * weight, 2);

  return (
    <div className="flex flex-col items-center justify-center w-full p-4 mx-auto my-6 space-y-6">
      <div className="flex items-center justify-between w-full gap-x-2">
        <div className="h-0.5 w-1/3 bg-primary rounded opacity-70"></div>
        <h1 className="w-full mx-auto text-xl font-bold text-center md:text-3xl">
          Calcula a tua nota <span className="text-primary">final</span>
        </h1>
        <div className="h-0.5 w-1/3 bg-primary rounded opacity-70"></div>
      </div>
      <div className="flex flex-col items-center md:flex-row gap-y-4 ">
        <div className="flex items-center w-full gap-x-2">
          <label className="w-32 text-lg text-right" htmlFor="frequency">
            Frequência
          </label>
          <input
            className="w-full p-2 border-2 rounded-lg mr-7 border-primary dark:bg-secondary-dark dark:text-white"
            value={frequency === null ? '' : frequency}
            onChange={(e) => {
              const value = e.target.value;
              if (value === '') setFrequency(null);
              if (value.match(/^\d{1,}(\.\d{0,2})?$/)) {
                if (parseFloat(value) < 0) return setFrequency(0);
                if (parseFloat(value) > MAX_GRADE) return setFrequency(MAX_GRADE);
                setFrequency(parseFloat(value));
              }
            }}
            step={0.1}
            type="number"
          />
        </div>

        <div className="flex items-center w-full gap-x-2">
          <label className="w-32 text-lg text-right" htmlFor="exam">
            Exame
          </label>
          <input
            className="w-full p-2 border-2 rounded-lg border-primary dark:bg-secondary-dark dark:text-white"
            value={exam === null ? '' : exam}
            onChange={(e) => {
              const value = e.target.value;
              if (value === '') setExam(null);
              const val = value.match(/^\d{1,}(\.\d{0,2})?$/);
              if (val) {
                if (parseFloat(value) < 0) return setExam(0);
                if (parseFloat(value) > MAX_GRADE) return setExam(MAX_GRADE);
                setExam(parseFloat(value));
              }
            }}
            step={0.1}
            type="number"
          />
          <div
            className={`relative text-red-500 cursor-pointer w-6 ${
              exam && exam < minGrade ? 'visible' : 'invisible'
            }`}
            onMouseOver={() => {
              setTooltipVisible(true);
            }}
            onMouseLeave={() => {
              setTooltipVisible(false);
            }}
            onClick={() => {
              setTooltipVisible((cur) => !cur);
            }}>
            ⚠️
            {tooltipVisible && (
              <span className="absolute z-10 p-2 mt-2 text-xs text-white bg-red-500 rounded-md shadow-md bottom-4 -left-10 md:left-4">
                A tua nota no exame é inferior à nota mínima para aprovação.
              </span>
            )}
          </div>
        </div>
      </div>

      <p className="text-xl">
        A tua nota final atual:{' '}
        <span
          className={`font-bold ${
            finalGrade !== null && finalGrade >= 9.5 ? 'text-green-500' : 'text-red-500'
          }`}>
          {finalGrade ? finalGrade : 'Preenche os campos acima para veres a tua nota final'}
        </span>
      </p>
    </div>
  );
};

export default GradeCalculator;
