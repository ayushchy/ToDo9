import ToDo from "@/components/todo";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex h-screen w-full justify-center items-center">
      <ToDo/>
    </div>
  );
}
