export function applyOperation(text, operation) {
  const index = Math.max(0, Math.min(operation.index, text.length));
  if (operation.type === 'insert') return text.slice(0, index) + operation.value + text.slice(index);
  if (operation.type === 'delete') return text.slice(0, index) + text.slice(index + (operation.length || 1));
  return text;
}

export function createOperation(type, index, value = '', length = 1) {
  return { id: `${Date.now()}-${Math.random().toString(16).slice(2)}`, type, index, value, length, time: new Date().toLocaleTimeString() };
}
