import { Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 grid grid-cols-9 col-span-full text-white w-full ">
      <div className="col-start-3 col-span-5 p-5">
        <p className="text-gray-400">Letory</p>
        <p className="flex gap-2">
          Simfart
          <a href={"https://github.com/Simfort/Lestory"}>
            <Github />
          </a>
        </p>
      </div>
    </footer>
  );
}
