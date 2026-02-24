import { Link } from "react-router-dom";
import PageSEO from "@/components/PageSEO";

const NotFound = () => {
  return (
    <>
      <PageSEO title="找不到頁面" description="您要找的頁面不存在。" path="/404" />
      <div className="flex min-h-screen items-center justify-center bg-background px-5">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold text-foreground">找不到頁面</h1>
          <p className="mb-6 text-lg text-muted-foreground">這個頁面不存在，可能是網址有誤。</p>
          <Link to="/" className="text-primary font-medium underline hover:text-primary/80">
            回到首頁
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
