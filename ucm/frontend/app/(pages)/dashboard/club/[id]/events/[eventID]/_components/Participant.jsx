"use client";

import { useState } from "react";
// Toaster
import toast from "react-hot-toast";

async function updateParticipantStatus(requestId, status, onStatusChange) {
  try {
    const data = {
      status: status,
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_BASE_URL}/update-event-participant-status/${requestId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      toast.error("An error occurred while updating status.");
      return;
    } else if (result?.status === "error") {
      toast.error(
        result?.message || "An error occurred while updating status."
      );
      return;
    }

    toast.success(result?.message || "Status updated successfully.");
    // Update participant's status
    onStatusChange(requestId, status);
  } catch (error) {
    console.error(error.message);
    toast.error("An error occurred while updating status.");
    return;
  }
}

export default function Participant({ item, index, onStatusChange }) {
  return (
    <tr className={`${index % 2 === 0 && "bg-gray-50"}`}>
      <td className="flex items-center gap-x-2 px-2 py-3">
        <div
          className={`min-w-[6px] min-h-[6px] size-[6px] rounded-full bg-black ${
            item?.status === "approved"
              ? "bg-green-500"
              : item?.status === "pending"
              ? "bg-orange-500"
              : item?.status === "rejected" && "bg-red-500"
          }`}
        />{" "}
        {item?.name}
      </td>
      <td className="px-2 py-3">{item?.email}</td>
      <td className="px-2 py-3">{item?.request_date}</td>
      <td className="w-full flex justify-end items-center gap-2 px-2 py-3 text-xs">
        {item?.status === "pending" ? (
          <>
            <button
              onClick={() =>
                updateParticipantStatus(
                  item?.requestId,
                  "approved",
                  onStatusChange
                )
              }
              className="bg-green-500/80 hover:bg-green-500 p-1 rounded text-white duration-300"
            >
              Accept
            </button>
            <button
              onClick={() =>
                updateParticipantStatus(
                  item?.requestId,
                  "rejected",
                  onStatusChange
                )
              }
              className="bg-red-500/80 hover:bg-red-500 p-1 rounded text-white duration-300"
            >
              Refuse
            </button>
          </>
        ) : (
          <span
            className={`capitalize ${
              item?.status === "approved"
                ? "text-green-500"
                : item?.status === "pending"
                ? "text-orange-500"
                : item?.status === "rejected" && "text-red-500"
            }`}
          >
            {item?.status}
          </span>
        )}
      </td>
    </tr>
  );
}
