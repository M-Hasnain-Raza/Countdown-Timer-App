"use client";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import "./app.css";

export default function Home() {
  const [minutes, setMinutes] = useState<number | string>("00");
  const [seconds, setSeconds] = useState<number | string>("00");
  const [value, setValue] = useState<number | string>("");

  let intervalRef = useRef<NodeJS.Timeout | undefined>();

  function setTimer() {
    setMinutes(Math.floor((+value as number) / 60));

    setSeconds((+value as number) % 60);
    console.log((+value as number) % 60);
  }

  function startTimer() {
    let sec = seconds;
    let min = minutes
    intervalRef.current = setInterval(function() {
      if(sec == 0 && min == 0){
        clearInterval(intervalRef.current)
      } else {
        if(sec == 0) {
          min = Number(min) - 1;
          sec = 60;
          setMinutes(min);
        }
        sec = Number(sec) - 1;
        setSeconds(sec);
        console.log(seconds)
      }

      console.log()
    }, 1000);
  }

  function pauseTimer() {
    clearInterval(intervalRef.current); 
  }

  function resetTimer() {
    clearInterval(intervalRef.current);
    setMinutes(0);
    setSeconds(0);
    setValue("");
  }

  return (
    <div className="px-2 flex w-full h-svh justify-center items-center bg-gray-100 ">
      <div className="main-box border min-h-72 rounded-xl shadow-lg bg-white px-5 py-7">
        <h1 className="text-2xl font-bold text-center">Countdown Timer</h1>
        <div className="flex justify-center gap-5 px-5 p-3">
          <Input
            onChange={(e) => {
              setValue(e.target.value);
            }}
            value={value}
            placeholder="Enter duration in seconds"
            className="rounded-xl"
            type="number"
          />
          <Button
            onClick={() => setTimer()}
            className="bg-white text-black rounded-xl"
            variant={"outline"}
          >
            Set
          </Button>
        </div>

        <div className=" flex text-6xl justify-center font-bold p-4">
          <div className="">{String(minutes).padStart(2, "0")}</div>
          <div className="">:</div>
          <div className="">{String(seconds).padStart(2, "0")}</div>
        </div>

        <div className="flex justify-center gap-3 p-3">
          <Button
            onClick={() => startTimer()}
            className="bg-white text-black rounded-xl"
            variant={"outline"}
          >
            Start
          </Button>

          <Button
          onClick={() => pauseTimer()}
            className="bg-white text-black rounded-xl"
            variant={"outline"}
          >
            Pause
          </Button>
          <Button
          onClick={() => resetTimer()}
            className="bg-white text-black rounded-xl"
            variant={"outline"}
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}
