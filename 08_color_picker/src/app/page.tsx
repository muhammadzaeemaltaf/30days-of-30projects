import ColorPicker from "@/components/color-picker";
import Image from "next/image";

export default function Home() {
  return (
   <div className="flex justify-center items-center h-screen bg-gray-50">
    <ColorPicker />    
   </div>
  );
}