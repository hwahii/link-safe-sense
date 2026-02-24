const Footer = () => (
  <footer className="border-t border-border bg-muted/30 mt-16">
    <div className="max-w-lg mx-auto px-5 py-6 text-center space-y-2">
      <p className="text-sm text-muted-foreground">
        © {new Date().getFullYear()}{" "}
        <a
          href="https://hwahii.tw"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          Hwahii
        </a>
      </p>
      <p className="text-sm text-muted-foreground">
        本站不收集任何個人資料，所有資料僅儲存在您的裝置上。
      </p>
    </div>
  </footer>
);

export default Footer;
