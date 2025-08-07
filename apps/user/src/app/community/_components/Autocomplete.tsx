type AutocompleteProps = {
  suggestions: string[];
  isLoading: boolean;
  handleSelect: (title: string) => void;
  visible: boolean;
};

export default function Autocomplete({
  suggestions,
  isLoading,
  handleSelect,
  visible,
}: AutocompleteProps) {
  if (!visible) return null;

  return (
    <div className="absolute mt-2 w-full bg-primary text-secondary border border-gray-300 rounded-xl shadow-lg max-h-64 overflow-auto">
      {isLoading ? (
        <div className="p-4 text-gray-500">Loading...</div>
      ) : suggestions.length > 0 ? (
        <ul>
          {suggestions.map((title, index) => (
            <li
              key={index}
              onMouseDown={() => {
                handleSelect(title);
              }}
              className="p-3 cursor-pointer text-sm hover:bg-secondary hover:text-primary"
            >
              {title}
            </li>
          ))}
        </ul>
      ) : (
        <div className="p-4 text-gray-400">No suggestions found</div>
      )}
    </div>
  );
}
