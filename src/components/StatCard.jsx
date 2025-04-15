export default function StatCard({ children, grid }) {
  return (
    <div
      className={`bg-gray-900 p-6 rounded-lg shadow-md text-left flex flex-col gap-4 ${grid}`}
    >
      {children}
    </div>
  );
}
