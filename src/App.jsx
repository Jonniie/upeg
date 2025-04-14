/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import PollingPYUSDStats from "./components/PollingPYUSDState";

export default function Home() {
  return (
    <div>
      <PollingPYUSDStats />
    </div>
  );
}
