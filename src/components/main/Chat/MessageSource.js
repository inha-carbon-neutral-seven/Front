function MessageSource({ message }) {
  return (
    <div className="bg-white/70 text-black/80 rounded w-11/12 mt-2 overflow-x-scroll">
      {message.input && (
        <div className="border p-1 rounded overflow-auto">
          <div className="bg-gray-50/50 pl-1 my-2 text-green-600">Input</div>
          <pre className="pl-4 pb-2 overflow-x-auto font-nanum text-xs">
            {message.input}
          </pre>
        </div>
      )}
      {message.output && (
        <div className="border p-1 rounded overflow-auto">
          <div className="bg-gray-50/50 pl-1 my-2 text-blue-600">
            {message.input ? "Output" : "Document"}
          </div>
          <pre className="pl-4 pb-2 overflow-x-auto font-nanum text-xs">
            {message.output}
          </pre>
        </div>
      )}
    </div>
  );
}
export default MessageSource;
