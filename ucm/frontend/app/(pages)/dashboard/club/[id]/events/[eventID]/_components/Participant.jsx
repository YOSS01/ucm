"use client";

export default function Participant({ item, index }) {
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
        {item?.fullName}
      </td>
      <td className="px-2 py-3">{item?.email}</td>
      <td className="px-2 py-3">14/03/2024 12:35:30</td>
      <td className="w-full flex justify-end items-center gap-2 px-2 py-3 text-xs">
        {item?.status === "pending" ? (
          <>
            <button
              onClick={() => alert("Accepted")}
              className="bg-green-500/80 hover:bg-green-500 p-1 rounded text-white duration-300"
            >
              Accept
            </button>
            <button
              onClick={() => alert("Rejected")}
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
