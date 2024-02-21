function MessageSource({ message }) {
  return (
    <div className="bg-white/70 text-black/80 rounded w-11/12 mt-2">
      <div className="bg-gray-50/50 w-auto h-6 pl-1 my-2 font-bold">Source</div>
      {message.input && (
        <div className="border m-1 rounded">
          <div className="bg-gray-50/50 pl-1 my-2 text-green-600">Input</div>
          <div className="p-1">
            <pre className="overflow-x-auto text-xs">{message.input}</pre>
          </div>
        </div>
      )}
      {message.output && (
        <div className="border m-1 rounded">
          <div className="bg-gray-50/50 pl-1 my-2 text-blue-600">
            {message.input ? "Output" : "Document"}
          </div>
          <div className="p-1">
            <pre className="overflow-x-auto text-xs">{message.output}</pre>
          </div>
        </div>
      )}
    </div>
  );
}
export default MessageSource;
