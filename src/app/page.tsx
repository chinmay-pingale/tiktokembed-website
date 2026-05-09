import EmbedTool from "@/components/EmbedTool";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <EmbedTool />
      </main>
      <SiteFooter />
    </>
  );
}
