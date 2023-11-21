import Image from "next/image";
import Link from "next/link";
import { IoBasketOutline, IoCalendarOutline, IoCheckboxOutline, IoListOutline, IoPersonAddOutline } from "react-icons/io5";
import { SidebarMenuItem, SignoutButton } from "..";
import { SidebarMenuItemProps } from "./SidebarMenuItem";
import { FaCookieBite } from "react-icons/fa";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

const menuItems: SidebarMenuItemProps[] = [
  {
    title: "Dashboard",
    icon: <IoCalendarOutline size={30} />,
    subtitle: "",
    path: "/dashboard",
  },
  {
    title: "REST TODOS",
    icon: <IoCheckboxOutline size={30} />,
    subtitle: "",
    path: "/dashboard/rest-todos",
  },
  {
    title: "Server Actions",
    icon: <IoListOutline size={30} />,
    subtitle: "",
    path: "/dashboard/server-todos",
  },
  {
    title: "Cookies",
    icon: <FaCookieBite size={30} />,
    subtitle: "",
    path: "/dashboard/cookies",
  },
  {
    title: "Products",
    icon: <IoBasketOutline size={30} />,
    subtitle: "",
    path: "/dashboard/products",
  },
  {
    title: "Profile",
    icon: <IoPersonAddOutline size={30} />,
    subtitle: "",
    path: "/dashboard/profile",
  },
];

export const Sidebar = async() => {

  const session = await getServerSession(authOptions);

  const avatarUrl = (session?.user?.image) 
  ? session.user.image
  : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3V808oCxPrW0lGe2AQABhwz-_3BCpyRj8Cw&usqp=CAU'

  const userName = session?.user?.name ?? 'No Name';
  const userRoles = session?.user?.roles ?? ['Client'];
 
  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
      <div>
        <div className="-mx-6 px-6 py-4">
          <Link href="/dashboard" title="home">
            <Image
              src="https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg"
              width={20}
              height={20}
              className="w-32"
              alt="tailus logo"
              priority
            />
          </Link>
        </div>

        <div className="mt-8 text-center">
          <Image
            src={ avatarUrl }
            width={200}
            height={200}
            priority
            alt="Photo from third party"
            className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
          />
          <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
            { userName }
          </h5>
          <span className="hidden text-gray-400 lg:block">{ userRoles.join(' | ') }</span>
        </div>

        <div className="space-y-2 tracking-wide mt-8">
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.path} {...item} />
          ))}
        </div>
      </div>

      <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
        <SignoutButton/>
      </div>
    </aside>
  );
};
