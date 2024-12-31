import { ReactNode } from "react";

type HeaderProps = {
  image: { src: string; alt: string };
  children: ReactNode;
};

export default function Header({ image, children }: HeaderProps) {
  return (
    <header className="flex flex-col items-center justify-center gap-6">
      <img className="w-20 h-20 rounded-full" src={image.src} alt={image.alt} />
      {children}
    </header>
  );
}
