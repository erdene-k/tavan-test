type MessageProps = {
  message: {
    role: "user" | "assistant";
    content: string;
  };
};

export function Message({ message }: MessageProps) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`py-2 px-4 rounded-lg max-w-[80%] ${
          isUser ? "bg-[#60A5FA] text-[#F9FAFB]" : "bg-gray-100 text-gray-800"
        }`}
      >
    <div dangerouslySetInnerHTML={{ __html: message.content }} />
      </div>
    </div>
  );
}