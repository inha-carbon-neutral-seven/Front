function MessageSource({ message }) {
  return (
    <div className="bg-black/70 text-white rounded w-11/12 mt-2">
      <div className="bg-gray-50/50 w-auto h-6 pl-1">Python Source</div>
      {message.input && (
        <div className="border m-1 rounded">
          <div className="bg-gray-50/50 pl-1">input</div>
          <div className="px-1">{message.input}</div>
        </div>
      )}
      {message.output && (
        <div className="border m-1 rounded">
          <div className="bg-gray-50/50 pl-1">output</div>
          <div className="pl-1">{message.output}</div>
        </div>
      )}
    </div>
  );
}
export default MessageSource;
