function MessageSource({ message }) {
  return (
    <div className="bg-white/70 text-black/80 rounded w-11/12 mt-2 overflow-x-scroll">
      <div className="bg-gray-50/50 w-auto h-6 pl-1 my-2 font-bold">Source</div>
      {message.input && (
        <div className="border p-1 rounded overflow-auto">
          <div className="bg-gray-50/50 pl-1 my-2 text-green-600">input</div>
          <pre className="pl-4 font-nanum">{message.input}</pre>
        </div>
      )}
      {message.output && (
        <div className="border p-1 rounded overflow-auto">
          <div className="bg-gray-50/50 pl-1 my-2 text-blue-600">output</div>
          <pre className="pl-4 font-nanum">{message.output}</pre>
        </div>
      )}
    </div>
  );
}
export default MessageSource;
