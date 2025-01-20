import Image from "next/image";

// components
import View from "./View";
import Edit from "./Edit";
import Delete from "./Delete";
import Link from "next/link";

export default function Event({ item, id }) {
  console.log(item);
  return (
    <li>
      <div className="w-full flex justify-center items-center">
        <div className="group w-full max-w-[300px] h-[300px] rounded-3xl border flex flex-col justify-start items-center overflow-hidden">
          <div className="w-full h-1/2 overflow-hidden border-b">
            {item?.picture && (
              <Image
                src={`${process.env.NEXT_PUBLIC_APP_BASE_FILE_PATH}/events/${item?.picture}`}
                alt="Background"
                width={500}
                height={500}
                className="w-full h-full object-cover pointer-events-none"
              />
            )}
          </div>
          <div className="w-full h-1/2 flex flex-col justify-between items-center gap-y-3 p-3 text-sm">
            <h2 className="font-original_surfer text-center line-clamp-2">
              <Link href={`/dashboard/club/${id}/events/${item?.id}`}>
                {item?.name}
              </Link>
            </h2>
            <div className="w-full flex flex-col gap-y-1 text-xs text-gray-600">
              <span className="line-clamp-1">
                Location:{" "}
                <span className="text-black font-medium">{item?.location}</span>
              </span>
              <span>
                Date:{" "}
                <span className="text-black font-medium">{item?.date}</span>
              </span>
            </div>
            <div className="w-full flex justify-end items-center gap-x-1">
              <View event={item} id={id} />
              <Edit event={item} />
              <Delete id={item?.id} />
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
