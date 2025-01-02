interface ErrorBlockProps {
  title: string;
  message: string;
}

export default function ErrorBlock({ title, message }: ErrorBlockProps) {
  return (
    <div className="flex items-center gap-8 bg-[#f0d9e5] my-4 p-4 rounded text-[#890b35] text-left">
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#890b35] text-white text-[2rem]">
        !
      </div>
      <div>
        <h2 className="text-xl m-0">{title}</h2>
        <p className="m-0">{message}</p>
      </div>
    </div>
  );
}
