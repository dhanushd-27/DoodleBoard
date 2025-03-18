import PrimaryButton from "@/components/Buttons/PrimaryButton";

export default function Home() {
  return (
    <div className="w-full h-[100svh] bg-gray-800 flex items-center justify-center gap-4">
      <PrimaryButton to='/login' name="Log In"/>
      <PrimaryButton to="/signup" name="Sign Up"/>
    </div>
  );
}
