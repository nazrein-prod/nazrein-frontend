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
    <div className="bg-primary text-secondary absolute mt-2 max-h-64 w-full overflow-auto rounded-xl border border-gray-300 shadow-lg">
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
              className="hover:bg-secondary hover:text-primary cursor-pointer p-3 text-sm"
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
