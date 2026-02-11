import type React from "react";

interface PageProps {
    label: string;
    points: number;
    icon: React.ReactNode;
}

function Stats({label, points, icon} : PageProps){
    return (
         <div className="w-1/5 flex flex-col items-center">
              {icon}
              <p className="text-xl font-bold">{points}</p>
              <p className="text-gray-500 text-sm text-center">{label}</p>
            </div>
    )
}


export default Stats;