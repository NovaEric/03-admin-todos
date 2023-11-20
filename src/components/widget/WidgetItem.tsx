import { ReactNode } from "react";

interface Props {
  tittle: string;
  children: ReactNode;
}

export const WidgetItem = ({ tittle, children }: Props) => {
  return (
    <div className="md:col-span-2 lg:col-span-1">
      <div className="h-full py-8 px-6 space-y-6 rounded-xl border border-gray-200 bg-white">
        <div className="flex flex-col">
          <h5 className="text-4xl font-bold text-gray-800 text-center underline">
            {tittle}
          </h5>
          <div className="mt-2 flex flex-col justify-center gap-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
