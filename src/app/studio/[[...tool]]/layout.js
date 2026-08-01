export { metadata, viewport } from "next-sanity/studio";

export default function StudioLayout({ children }) {
  return (
    <div style={{ height: "100vh", margin: 0, overflow: "hidden" }}>
      {children}
    </div>
  );
}
