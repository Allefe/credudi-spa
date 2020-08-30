export function primeiraLetraMaiuscula(text: any) {
  var words = text.toLowerCase().split(" ");
  for (var a = 0; a < words.length; a++) {
      if (words[a].length > 3) {
        var w = words[a];
        words[a] = w[0].toUpperCase() + w.slice(1);
      }
  }
  return words.join(" ");
}