import { BackgroundBeams } from "./Backgrounds/Beams";

interface ILaunch {
  title: string,
  desc: string
}

export const LaunchPageComponent: React.FC<ILaunch> = ({ title, desc }) => {
  return (
    <div>
        <BackgroundBeams title={title} desc={desc}  />
    </div>
  );
};