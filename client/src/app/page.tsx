import Image from "next/image";
import Navbar from "./components/Navbar";
import Dropzone from "./components/Dropzone";

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-y-40">
      <Navbar/>
      <div className="w-3/4"><Dropzone/></div>
    </div>
  );
}
