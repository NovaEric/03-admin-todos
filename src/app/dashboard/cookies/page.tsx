import { TabBar } from "@/components";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
    title: 'Cookies Page',
    description: 'Cookies Page Demo'
}

export default function CookiesPage() {

  const cookieTab = cookies().get('selectedTab')?.value ?? '1';
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div className="flex flex-col">
        <span className="text-3xl pb-5">Tabs</span>
        <TabBar currentTab={ +cookieTab }/>
      </div>
    </div>
  );
}