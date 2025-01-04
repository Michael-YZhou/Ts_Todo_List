export default function LoadingIndicator() {
  return (
    <div className="flex items-center justify-center">
      <div
        className="inline-block w-20 h-20 
           border-8 border-solid border-pink-600 
           rounded-full border-r-transparent 
           animate-spin"
      ></div>
    </div>
  );
}
