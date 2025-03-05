import { Button } from "@repo/ui/button"
import Input  from "@repo/ui/input"

export default function Home() {
  return (
    <>
      <Button appName="Hii" className="bg-white text-black py-2 px-6 rounded-full">
        <p>Hello</p>
      </Button>

      <br />
      <br />
      <br />

      <Input className="bg-white text-black py-2 px-6 rounded-full" placeholder="Enter your number" />
    </>
  );
}
