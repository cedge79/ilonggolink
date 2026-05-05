export interface DictionaryEntry {
  root: string;
  english: string;
  type: 'verb' | 'noun' | 'adj' | 'connector' | 'pronoun' | 'question' | 'number' | 'time' | 'medical' | 'emergency' | 'social' | 'family' | 'food' | 'place' | 'transport' | 'money' | 'phrase';
}

const AFFIX_RULES = [
  { prefix: "nag", tense: "past", type: "verb" },
  { prefix: "naga", tense: "present", type: "verb" },
  { prefix: "maga", tense: "future", type: "verb" },
  { prefix: "nagka", tense: "past", type: "verb" },
  { prefix: "nagaka", tense: "present", type: "verb" },
  { prefix: "magaka", tense: "future", type: "verb" },
  { prefix: "gin", focus: "object", tense: "past", type: "verb" },
  { prefix: "gina", focus: "object", tense: "present", type: "verb" },
  { prefix: "ginka", focus: "object", tense: "past", type: "verb" },
  { prefix: "mag", focus: "actor", tense: "future", type: "verb" },
  { prefix: "ma", type: "adj" },
  { prefix: "ka", type: "adj_state" },
  { prefix: "pagka", type: "noun_state" },
  { suffix: "on", focus: "object", type: "verb" },
  { suffix: "an", focus: "location", type: "verb" },
  { suffix: "han", focus: "location", type: "verb" },
  { infix: "in", tense: "past", focus: "object" },
];

export const COMPREHENSIVE_DICTIONARY: DictionaryEntry[] = [
  // PRONOUNS
  { root: "ako", english: "I", type: 'pronoun' },
  { root: "ikaw", english: "you", type: 'pronoun' },
  { root: "ka", english: "you", type: 'pronoun' },
  { root: "sia", english: "he/she", type: 'pronoun' },
  { root: "iyan", english: "that", type: 'pronoun' },
  { root: "ini", english: "this", type: 'pronoun' },
  { root: "kami", english: "we (exclusive)", type: 'pronoun' },
  { root: "kita", english: "we (inclusive)", type: 'pronoun' },
  { root: "kamo", english: "you all", type: 'pronoun' },
  { root: "sila", english: "they", type: 'pronoun' },
  { root: "akon", english: "my/mine", type: 'pronoun' },
  { root: "imo", english: "your/yours", type: 'pronoun' },
  { root: "iya", english: "his/hers", type: 'pronoun' },
  { root: "aton", english: "our/ours", type: 'pronoun' },
  { root: "inyo", english: "your (plural)", type: 'pronoun' },
  { root: "nila", english: "their/theirs", type: 'pronoun' },

  // CONNECTORS & PARTICLES
  { root: "hu-o", english: "yes", type: 'connector' },
  { root: "uo", english: "yes", type: 'connector' },
  { root: "indi", english: "no/not", type: 'connector' },
  { root: "wala", english: "none/there is not", type: 'connector' },
  { root: "kag", english: "and", type: 'connector' },
  { root: "pero", english: "but", type: 'connector' },
  { root: "sang", english: "of/from", type: 'connector' },
  { root: "sa", english: "at/in/to", type: 'connector' },
  { root: "man", english: "also/too", type: 'connector' },
  { root: "lang", english: "just/only", type: 'connector' },
  { root: "gid", english: "really/very", type: 'connector' },
  { root: "nga", english: "that/which (linker)", type: 'connector' },
  { root: "ngadto", english: "towards", type: 'connector' },
  { root: "halin", english: "from/since", type: 'connector' },
  { root: "para", english: "for", type: 'connector' },
  { root: "kay", english: "because", type: 'connector' },
  { root: "kon", english: "if", type: 'connector' },
  { root: "bisan", english: "even/although", type: 'connector' },
  { root: "dayon", english: "then/next", type: 'connector' },

  // QUESTIONS
  { root: "ano", english: "what", type: 'question' },
  { root: "diin", english: "where", type: 'question' },
  { root: "san-o", english: "when", type: 'question' },
  { root: "sin-o", english: "who", type: 'question' },
  { root: "nga-a", english: "why", type: 'question' },
  { root: "paano", english: "how", type: 'question' },
  { root: "pila", english: "how much/how many", type: 'question' },
  { root: "hain", english: "where (is)", type: 'question' },
  { root: "kamusta", english: "how are you", type: 'question' },

  // FAMILY
  { root: "nanay", english: "mother", type: 'family' },
  { root: "tatay", english: "father", type: 'family' },
  { root: "mama", english: "mom", type: 'family' },
  { root: "tata", english: "dad", type: 'family' },
  { root: "lola", english: "grandmother", type: 'family' },
  { root: "lolo", english: "grandfather", type: 'family' },
  { root: "anak", english: "child", type: 'family' },
  { root: "anak nga babae", english: "daughter", type: 'family' },
  { root: "anak nga lalaki", english: "son", type: 'family' },
  { root: "kapatid", english: "sibling", type: 'family' },
  { root: "manug", english: "elder sibling", type: 'family' },
  { root: "pangidto", english: "younger sibling", type: 'family' },
  { root: "bayaw", english: "brother-in-law", type: 'family' },
  { root: "hipag", english: "sister-in-law", type: 'family' },
  { root: "ugangan", english: "parent-in-law", type: 'family' },
  { root: "apo", english: "grandchild", type: 'family' },
  { root: "pamilya", english: "family", type: 'family' },
  { root: "asawa", english: "spouse/wife", type: 'family' },
  { root: " bana", english: "husband", type: 'family' },
  { root: "iyabag", english: "girlfriend", type: 'family' },
  { root: "amiga", english: "friend (female)", type: 'family' },
  { root: "amigo", english: "friend (male)", type: 'family' },

  // NUMBERS
  { root: "isa", english: "one", type: 'number' },
  { root: "duha", english: "two", type: 'number' },
  { root: "tatlo", english: "three", type: 'number' },
  { root: "apat", english: "four", type: 'number' },
  { root: "lima", english: "five", type: 'number' },
  { root: "anom", english: "six", type: 'number' },
  { root: "pito", english: "seven", type: 'number' },
  { root: "walo", english: "eight", type: 'number' },
  { root: "siyam", english: "nine", type: 'number' },
  { root: "napulo", english: "ten", type: 'number' },
  { root: "napulo kag isa", english: "eleven", type: 'number' },
  { root: "napulo kag duha", english: "twelve", type: 'number' },
  { root: "napulo kag tatlo", english: "thirteen", type: 'number' },
  { root: "napulo kag apat", english: "fourteen", type: 'number' },
  { root: "napulo kag lima", english: "fifteen", type: 'number' },
  { root: "napulo kag anom", english: "sixteen", type: 'number' },
  { root: "napulo kag pito", english: "seventeen", type: 'number' },
  { root: "napulo kag walo", english: "eighteen", type: 'number' },
  { root: "napulo kag siyam", english: "nineteen", type: 'number' },
  { root: "kalawhaan", english: "twenty", type: 'number' },
  { root: "kalawhaan kag isa", english: "twenty-one", type: 'number' },
  { root: "katloan", english: "thirty", type: 'number' },
  { root: "kap-atan", english: "forty", type: 'number' },
  { root: "kalimaan", english: "fifty", type: 'number' },
  { root: "kan-anan", english: "sixty", type: 'number' },
  { root: "kapitoan", english: "seventy", type: 'number' },
  { root: "kawaloan", english: "eighty", type: 'number' },
  { root: "kasiyaman", english: "ninety", type: 'number' },
  { root: "ginatos", english: "hundred", type: 'number' },
  { root: "libo", english: "thousand", type: 'number' },

  // TIME
  { root: "adlaw", english: "day", type: 'time' },
  { root: "gab-i", english: "night", type: 'time' },
  { root: "kaagahon", english: "morning", type: 'time' },
  { root: "halong", english: "afternoon", type: 'time' },
  { root: "hapon", english: "late afternoon", type: 'time' },
  { root: "gabi-i", english: "evening", type: 'time' },
  { root: "tudlo", english: "noon", type: 'time' },
  { root: "tungang gab-i", english: "midnight", type: 'time' },
  { root: "karun", english: "today", type: 'time' },
  { root: "gahu", english: "yesterday", type: 'time' },
  { root: "maaga", english: "tomorrow", type: 'time' },
  { root: "sunod", english: "next", type: 'time' },
  { root: "ligad", english: "last/previous", type: 'time' },
  { root: "oras", english: "time/hour", type: 'time' },
  { root: "minuto", english: "minute", type: 'time' },
  { root: "semana", english: "week", type: 'time' },
  { root: "bulan", english: "month", type: 'time' },
  { root: "tuig", english: "year", type: 'time' },
  { root: "lunes", english: "Monday", type: 'time' },
  { root: "martes", english: "Tuesday", type: 'time' },
  { root: "mierkoles", english: "Wednesday", type: 'time' },
  { root: "huebes", english: "Thursday", type: 'time' },
  { root: "biyernes", english: "Friday", type: 'time' },
  { root: "sabado", english: "Saturday", type: 'time' },
  { root: "domingo", english: "Sunday", type: 'time' },

  // VERBS
  { root: "kaon", english: "eat", type: 'verb' },
  { root: "kadto", english: "go", type: 'verb' },
  { root: "hambal", english: "speak/talk", type: 'verb' },
  { root: "bakal", english: "buy", type: 'verb' },
  { root: "baligya", english: "sell", type: 'verb' },
  { root: "inom", english: "drink", type: 'verb' },
  { root: "tulog", english: "sleep", type: 'verb' },
  { root: "mata", english: "wake up/open eyes", type: 'verb' },
  { root: "bangon", english: "get up/stand", type: 'verb' },
  { root: "lingkod", english: "sit", type: 'verb' },
  { root: "lakat", english: "walk", type: 'verb' },
  { root: "dalagan", english: "run", type: 'verb' },
  { root: "sakay", english: "ride", type: 'verb' },
  { root: "lugsong", english: "descend/get off", type: 'verb' },
  { root: "obra", english: "work", type: 'verb' },
  { root: "tu-on", english: "learn/study", type: 'verb' },
  { root: "tudlo", english: "teach", type: 'verb' },
  { root: "hibalo", english: "know", type: 'verb' },
  { root: "bulig", english: "help", type: 'verb' },
  { root: "lantaw", english: "watch/look", type: 'verb' },
  { root: "bati", english: "hear/feel", type: 'verb' },
  { root: "hulat", english: "wait", type: 'verb' },
  { root: "hatag", english: "give", type: 'verb' },
  { root: "baton", english: "receive/take", type: 'verb' },
  { root: "sulat", english: "write", type: 'verb' },
  { root: "basa", english: "read", type: 'verb' },
  { root: "luto", english: "cook", type: 'verb' },
  { root: "hugas", english: "wash", type: 'verb' },
  { root: "limpyo", english: "clean", type: 'verb' },
  { root: "sulod", english: "enter", type: 'verb' },
  { root: "guwa", english: "exit/go out", type: 'verb' },
  { root: "halin", english: "leave/depart", type: 'verb' },
  { root: "uli", english: "go home/return", type: 'verb' },
  { root: "palangga", english: "love", type: 'verb' },
  { root: "dumdom", english: "remember", type: 'verb' },
  { root: "kalimot", english: "forget", type: 'verb' },
  { root: "hunahuna", english: "think", type: 'verb' },
  { root: "pangita", english: "find/look for", type: 'verb' },
  { root: "abot", english: "arrive", type: 'verb' },
  { root: "halo", english: "mix", type: 'verb' },
  { root: "tawag", english: "call", type: 'verb' },
  { root: "pamangkot", english: "ask", type: 'verb' },
  { root: "sabat", english: "answer/reply", type: 'verb' },
  { root: "padayon", english: "continue", type: 'verb' },
  { root: "untat", english: "stop/rest", type: 'verb' },
  { root: "dula", english: "play", type: 'verb' },
  { root: "kantahon", english: "sing", type: 'verb' },
  { root: "sayaw", english: "dance", type: 'verb' },
  { root: "bayad", english: "pay", type: 'verb' },
  { root: "tipig", english: "save", type: 'verb' },
  { root: "pangabuhi", english: "earn a living", type: 'verb' },
  { root: "pangayo", english: "ask for/request", type: 'verb' },
  { root: "paabot", english: "invite", type: 'verb' },

  // COMMON NOUNS
  { root: "balay", english: "house", type: 'noun' },
  { root: "kwarto", english: "room", type: 'noun' },
  { root: "kusina", english: "kitchen", type: 'noun' },
  { root: "banyo", english: "bathroom", type: 'noun' },
  { root: "sulod", english: "inside", type: 'noun' },
  { root: "gwa", english: "outside", type: 'noun' },
  { root: "dalan", english: "road/street", type: 'noun' },
  { root: "puerto", english: "port", type: 'noun' },
  { root: "merkado", english: "market", type: 'noun' },
  { root: "tienda", english: "store/shop", type: 'noun' },
  { root: "eskuelahan", english: "school", type: 'noun' },
  { root: "iglesia", english: "church", type: 'noun' },
  { root: "ospital", english: "hospital", type: 'noun' },
  { root: "pabrika", english: "factory", type: 'noun' },
  { root: "palengke", english: "wet market", type: 'noun' },
  { root: "plaza", english: "town square", type: 'noun' },
  { root: "parque", english: "park", type: 'noun' },
  { root: "tindahan", english: "small store", type: 'noun' },

  // FOOD & DRINK
  { root: "pagkaon", english: "food", type: 'food' },
  { root: "tubig", english: "water", type: 'food' },
  { root: "kan-on", english: "rice (cooked)", type: 'food' },
  { root: "humay", english: "rice (uncooked)", type: 'food' },
  { root: "isda", english: "fish", type: 'food' },
  { root: "karne", english: "meat", type: 'food' },
  { root: "manok", english: "chicken", type: 'food' },
  { root: "baboy", english: "pork", type: 'food' },
  { root: "baka", english: "beef", type: 'food' },
  { root: "ulang", english: "shrimp", type: 'food' },
  { root: "pusit", english: "squid", type: 'food' },
  { root: "alimango", english: "crab", type: 'food' },
  { root: "itlog", english: "egg", type: 'food' },
  { root: "prutas", english: "fruit", type: 'food' },
  { root: "mansanitas", english: "apple", type: 'food' },
  { root: "saging", english: "banana", type: 'food' },
  { root: "mangga", english: "mango", type: 'food' },
  { root: "pinya", english: "pineapple", type: 'food' },
  { root: "papaya", english: "papaya", type: 'food' },
  { root: "kalabasa", english: "squash", type: 'food' },
  { root: "kamote", english: "sweet potato", type: 'food' },
  { root: "kamatis", english: "tomato", type: 'food' },
  { root: "sibuyas", english: "onion", type: 'food' },
  { root: "bawang", english: "garlic", type: 'food' },
  { root: "luya", english: "ginger", type: 'food' },
  { root: "asim", english: "sour/vinegar", type: 'food' },
  { root: "tam-is", english: "sweet", type: 'food' },
  { root: "maanghang", english: "spicy", type: 'food' },
  { root: "mapait", english: "bitter", type: 'food' },
  { root: "maalat", english: "salty", type: 'food' },
  { root: "kape", english: "coffee", type: 'food' },
  { root: "tsaa", english: "tea", type: 'food' },
  { root: "gatas", english: "milk", type: 'food' },
  { root: "suka", english: "vinegar", type: 'food' },
  { root: "asim", english: "sour", type: 'food' },
  { root: "patis", english: "fish sauce", type: 'food' },
  { root: "toyo", english: "soy sauce", type: 'food' },
  { root: "asin", english: "salt", type: 'food' },
  { root: "asukar", english: "sugar", type: 'food' },
  { root: "lawa", english: "soup/broth", type: 'food' },
  { root: "sinigang", english: "sour soup", type: 'food' },
  { root: "adobo", english: "adobo", type: 'food' },
  { root: "inihaw", english: "grilled", type: 'food' },
  { root: "pinakbet", english: "pinakbet", type: 'food' },
  { root: "lechon", english: "roasted pig", type: 'food' },
  { root: "empanada", english: "empanada", type: 'food' },
  { root: "puto", english: "rice cake", type: 'food' },
  { root: "kakanin", english: "rice delicacy", type: 'food' },
  { root: "halo-halo", english: "halo-halo", type: 'food' },
  { root: "turon", english: "banana spring roll", type: 'food' },
  { root: "lumpia", english: "spring roll", type: 'food' },
  { root: "pancit", english: "noodles", type: 'food' },
  { root: "siopao", english: "steamed bun", type: 'food' },

  // ADJECTIVES
  { root: "maayo", english: "good", type: 'adj' },
  { root: "malain", english: "bad", type: 'adj' },
  { root: "namit", english: "delicious", type: 'adj' },
  { root: "mahal", english: "expensive", type: 'adj' },
  { root: "barato", english: "cheap", type: 'adj' },
  { root: "daku", english: "big", type: 'adj' },
  { root: "diutay", english: "small/little", type: 'adj' },
  { root: "halaba", english: "long", type: 'adj' },
  { root: "malapad", english: "wide", type: 'adj' },
  { root: "makitid", english: "narrow", type: 'adj' },
  { root: "mabigat", english: "heavy", type: 'adj' },
  { root: "magaan", english: "light", type: 'adj' },
  { root: "malayo", english: "far", type: 'adj' },
  { root: "lapit", english: "near/close", type: 'adj' },
  { root: "matahum", english: "beautiful", type: 'adj' },
  { root: "gantam", english: "handsome", type: 'adj' },
  { root: "gwapo", english: "handsome", type: 'adj' },
  { root: "guwapo", english: "handsome", type: 'adj' },
  { root: "guwapa", english: "beautiful (female)", type: 'adj' },
  { root: "init", english: "hot", type: 'adj' },
  { root: "tugnaw", english: "cold", type: 'adj' },
  { root: "basag", english: "wet", type: 'adj' },
  { root: "tuo", english: "dry", type: 'adj' },
  { root: "gutom", english: "hungry", type: 'adj' },
  { root: "uhaw", english: "thirsty", type: 'adj' },
  { root: "kapoy", english: "tired", type: 'adj' },
  { root: "lipay", english: "happy", type: 'adj' },
  { root: "subo", english: "sad", type: 'adj' },
  { root: "malain", english: "angry", type: 'adj' },
  { root: "takot", english: "afraid", type: 'adj' },
  { root: "malip-ong", english: "short", type: 'adj' },
  { root: "bag-o", english: "new", type: 'adj' },
  { root: "daan", english: "old (things)", type: 'adj' },
  { root: "bata", english: "young", type: 'adj' },
  { root: "tigulang", english: "old (person)", type: 'adj' },
  { root: "busog", english: "full (stomach)", type: 'adj' },
  { root: "masig-on", english: "strong", type: 'adj' },
  { root: "mahuyang", english: "weak", type: 'adj' },
  { root: "paslit", english: "fast/quick", type: 'adj' },
  { root: "mahinay", english: "slow", type: 'adj' },
  { root: "malumpay", english: "soft/gentle", type: 'adj' },
  { root: "mapaspas", english: "fast", type: 'adj' },

  // TRANSPORTATION
  { root: "traysikol", english: "tricycle", type: 'transport' },
  { root: "dyipni", english: "jeepney", type: 'transport' },
  { root: "bus", english: "bus", type: 'transport' },
  { root: "sakyanan", english: "vehicle", type: 'transport' },
  { root: "motor", english: "motorcycle", type: 'transport' },
  { root: "bisikleta", english: "bicycle", type: 'transport' },
  { root: "sakayan", english: "terminal/boarding area", type: 'transport' },
  { root: "estasyon", english: "station", type: 'transport' },
  { root: "tolda", english: "tent (transport hub)", type: 'transport' },
  { root: "pier", english: "pier", type: 'transport' },
  { root: "bangka", english: "boat", type: 'transport' },
  { root: "eroplano", english: "airplane", type: 'transport' },
  { root: "tren", english: "train", type: 'transport' },
  { root: "hablon", english: "route/direction", type: 'transport' },
  { root: "paagi", english: "way/path", type: 'transport' },
  { root: "luyo", english: "behind/back", type: 'transport' },
  { root: "atubangan", english: "front", type: 'transport' },
  { root: "wala", english: "left", type: 'transport' },
  { root: "tuo", english: "right", type: 'transport' },
  { root: "diretso", english: "straight", type: 'transport' },
  { root: "liko", english: "turn", type: 'transport' },

  // MONEY & SHOPPING
  { root: "kwarta", english: "money", type: 'money' },
  { root: "presyo", english: "price", type: 'money' },
  { root: "bayad", english: "payment", type: 'money' },
  { root: "sukli", english: "change (money)", type: 'money' },
  { root: "diskwento", english: "discount", type: 'money' },
  { root: "mahal gid", english: "too expensive", type: 'money' },
  { root: "piso", english: "peso", type: 'money' },
  { root: "sentimo", english: "centavo", type: 'money' },
  { root: "barato gid", english: "very cheap", type: 'money' },
  { root: "tipig", english: "savings", type: 'money' },

  // MEDICAL & EMERGENCY
  { root: "tabang", english: "help", type: 'emergency' },
  { root: "sakit", english: "pain/sick", type: 'medical' },
  { root: "doktor", english: "doctor", type: 'medical' },
  { root: "bulong", english: "medicine", type: 'medical' },
  { root: "pulis", english: "police", type: 'emergency' },
  { root: "bumbero", english: "firefighter", type: 'emergency' },
  { root: "ambulance", english: "ambulance", type: 'medical' },
  { root: "demay", english: "dizzy", type: 'medical' },
  { root: "ubo", english: "cough", type: 'medical' },
  { root: "sip-on", english: "cold/runny nose", type: 'medical' },
  { root: "lagnat", english: "fever", type: 'medical' },
  { root: "ulcer", english: "ulcer", type: 'medical' },
  { root: "tawo", english: "person", type: 'noun' },

  // SOCIAL & GREETINGS
  { root: "salamat", english: "thank you", type: 'social' },
  { root: "ayaw salamat", english: "you're welcome", type: 'social' },
  { root: "kamusta", english: "hello/how are you", type: 'social' },
  { root: "maayong adlaw", english: "good day", type: 'social' },
  { root: "maayong aga", english: "good morning", type: 'social' },
  { root: "maayong hapon", english: "good afternoon", type: 'social' },
  { root: "maayong gab-i", english: "good evening/night", type: 'social' },
  { root: "adios", english: "goodbye", type: 'social' },
  { root: "paalam", english: "farewell", type: 'social' },
  { root: "ayay", english: "ouch", type: 'social' },
  { root: "pasensya", english: "sorry/excuse me", type: 'social' },
  { root: "paki", english: "please", type: 'social' },
  { root: "palihog", english: "please (request)", type: 'social' },
  { root: "diay", english: "I see/so that's it", type: 'social' },

  // BODY PARTS
  { root: "ulo", english: "head", type: 'noun' },
  { root: "mata", english: "eye", type: 'noun' },
  { root: "ilong", english: "nose", type: 'noun' },
  { root: "dunggan", english: "ear", type: 'noun' },
  { root: "ngabil", english: "lip", type: 'noun' },
  { root: "ngipon", english: "tooth", type: 'noun' },
  { root: "dila", english: "tongue", type: 'noun' },
  { root: "kamot", english: "hand", type: 'noun' },
  { root: "tiil", english: "foot", type: 'noun' },
  { root: "dugo", english: "blood", type: 'noun' },
  { root: "puso", english: "heart", type: 'noun' },
  { root: "tiyan", english: "stomach", type: 'noun' },
  { root: "likod", english: "back", type: 'noun' },
  { root: "lawas", english: "body", type: 'noun' },

  // NATURE
  { root: "kalibutan", english: "world", type: 'noun' },
  { root: "tuna", english: "land/earth", type: 'noun' },
  { root: "duta", english: "land/soil", type: 'noun' },
  { root: "tubig", english: "water", type: 'noun' },
  { root: "dagat", english: "sea/ocean", type: 'noun' },
  { root: "suba", english: "river", type: 'noun' },
  { root: "bukid", english: "mountain", type: 'noun' },
  { root: "kahoy", english: "tree/wood", type: 'noun' },
  { root: "bulak", english: "flower", type: 'noun' },
  { root: "hangin", english: "wind", type: 'noun' },
  { root: "ulan", english: "rain", type: 'noun' },
  { root: "init", english: "sun/heat", type: 'noun' },
  { root: "bulan", english: "moon", type: 'noun' },
  { root: "bato", english: "stone", type: 'noun' },
  { root: "lapa", english: "field", type: 'noun' },

  // HOUSEHOLD ITEMS
  { root: "pultahan", english: "door", type: 'noun' },
  { root: "bintana", english: "window", type: 'noun' },
  { root: "lampara", english: "light/lamp", type: 'noun' },
  { root: "bentilador", english: "fan", type: 'noun' },
  { root: "aparador", english: "closet/cabinet", type: 'noun' },
  { root: "katre", english: "bed", type: 'noun' },
  { root: "almohada", english: "pillow", type: 'noun' },
  { root: "kumot", english: "blanket", type: 'noun' },
  { root: "lamisa", english: "table", type: 'noun' },
  { root: "silya", english: "chair", type: 'noun' },
  { root: "salming", english: "mirror", type: 'noun' },
  { root: "sapaw", english: "towel", type: 'noun' },
  { root: "sabon", english: "soap", type: 'noun' },
  { root: "shampoo", english: "shampoo", type: 'noun' },
  { root: "toothbrush", english: "toothbrush", type: 'noun' },
  { root: "suklay", english: "comb", type: 'noun' },
  { root: "baso", english: "glass/cup", type: 'noun' },
  { root: "pinggan", english: "plate", type: 'noun' },
  { root: "kutsara", english: "spoon", type: 'noun' },
  { root: "tinidor", english: "fork", type: 'noun' },
  { root: "kutsilyo", english: "knife", type: 'noun' },
  { root: "kawali", english: "frying pan", type: 'noun' },
  { root: "kaldero", english: "pot", type: 'noun' },
  { root: "hagdanan", english: "stairs", type: 'noun' },
  { root: "balkonahe", english: "balcony", type: 'noun' },
  { root: "garahe", english: "garage", type: 'noun' },
  { root: "hardin", english: "garden", type: 'noun' },
  { root: "silong", english: "shade/under the house", type: 'noun' },
  { root: " bubong", english: "roof", type: 'noun' },
  { root: "salog", english: "floor", type: 'noun' },
  { root: "kuryente", english: "electricity", type: 'noun' },
  { root: "tubig", english: "water", type: 'noun' },
  { root: "telebisyon", english: "television", type: 'noun' },
  { root: "cellphone", english: "cell phone", type: 'noun' },
  { root: "charger", english: "charger", type: 'noun' },
  { root: "wala sang kuryente", english: "no electricity / power outage", type: 'noun' },
  { root: "walay tubig", english: "no water", type: 'noun' },

  // CLOTHING
  { root: "sinina", english: "dress", type: 'noun' },
  { root: "camisa", english: "shirt", type: 'noun' },
  { root: "pantalones", english: "pants", type: 'noun' },
  { root: "shorts", english: "shorts", type: 'noun' },
  { root: "sayal", english: "skirt", type: 'noun' },
  { root: "sapatos", english: "shoes", type: 'noun' },
  { root: "tsinelas", english: "slippers", type: 'noun' },
  { root: "sombrero", english: "hat", type: 'noun' },
  { root: "medyas", english: "socks", type: 'noun' },
  { root: "bistido", english: "dressed up", type: 'adj' },

  // WEATHER
  { root: "ulan", english: "rain", type: 'noun' },
  { root: "nagaulan", english: "it's raining", type: 'verb' },
  { root: "bagyo", english: "typhoon/storm", type: 'noun' },
  { root: "init", english: "hot/sun", type: 'noun' },
  { root: "tugnaw", english: "cold", type: 'noun' },
  { root: "hangin", english: "wind", type: 'noun' },
  { root: "bagyo", english: "storm", type: 'noun' },
  { root: "kidlat", english: "lightning", type: 'noun' },
  { root: "kulog", english: "thunder", type: 'noun' },
  { root: "dalag", english: "cloudy", type: 'adj' },
  { root: "maanyag", english: "beautiful (weather)", type: 'adj' },
  { root: "mainit", english: "it's hot", type: 'adj' },
  { root: "matugnaw", english: "it's cold", type: 'adj' },
  { root: "nagaulan", english: "raining", type: 'verb' },

  // EMOTIONS & FEELINGS
  { root: "lipay", english: "happy", type: 'adj' },
  { root: "subo", english: "sad", type: 'adj' },
  { root: "malain", english: "angry/mad", type: 'adj' },
  { root: "takot", english: "afraid/scared", type: 'adj' },
  { root: "kuryoso", english: "curious", type: 'adj' },
  { root: "malina", english: "shy", type: 'adj' },
  { root: "mahiyain", english: "shy/bashful", type: 'adj' },
  { root: "mapahitas-on", english: "proud", type: 'adj' },
  { root: "seloso", english: "jealous", type: 'adj' },
  { root: "naluya", english: "embarrassed", type: 'adj' },
  { root: "excited", english: "excited", type: 'adj' },
  { root: "inabor", english: "bored", type: 'adj' },
  { root: "nainis", english: "annoyed", type: 'adj' },
  { root: "grateful", english: "grateful", type: 'adj' },
  { root: "surprised", english: "surprised", type: 'adj' },
  { root: "nabalaka", english: "worried", type: 'adj' },
  { root: "kalipay", english: "happiness/joy", type: 'noun' },
  { root: "kasubo", english: "sadness", type: 'noun' },
  { root: "kasin-o", english: "anger", type: 'noun' },

  // SLANG & EXPRESSIONS
  { root: "sige", english: "okay/go ahead/sure", type: 'connector' },
  { root: "sige lang", english: "go ahead / keep going", type: 'connector' },
  { root: "ay nako", english: "oh no / oh my", type: 'social' },
  { root: "grabe", english: "wow / extreme / intense", type: 'social' },
  { root: "grabe gid", english: "so much / really extreme", type: 'social' },
  { root: "chalang", english: "okay / fine / alright", type: 'connector' },
  { root: "ano pa", english: "what else", type: 'question' },
  { root: "pwede", english: "can / possible / okay", type: 'connector' },
  { root: "indi pwede", english: "not allowed / not possible", type: 'connector' },
  { root: "sure ka?", english: "are you sure?", type: 'question' },
  { root: "oo naman", english: "yes of course", type: 'connector' },
  { root: "oo gid", english: "yes indeed", type: 'connector' },
  { root: "huhu", english: "crying sound", type: 'social' },
  { root: "hala", english: "oh no / alarm", type: 'social' },
  { root: "hay up", english: "let's go / come on", type: 'social' },
  { root: "aruy", english: "oh (realization)", type: 'social' },
  { root: "ara", english: "here (showing)", type: 'connector' },
  { root: "arato", english: "there (pointing)", type: 'connector' },
  { root: "diri", english: "here", type: 'connector' },
  { root: "didto", english: "there", type: 'connector' },
  { root: "day", english: "hey / friend (informal)", type: 'social' },
  { root: "teh", english: "sis / girl (informal)", type: 'social' },
  { root: "pre", english: "bro / dude (informal)", type: 'social' },
  { root: "lord", english: "wow / amazing (slang)", type: 'social' },
  { root: "petmalu", english: "amazing (slang)", type: 'adj' },

  // MORE VERBS
  { root: "abli", english: "open", type: 'verb' },
  { root: "sarado", english: "close/shut", type: 'verb' },
  { root: "wala", english: "sweep", type: 'verb' },
  { root: "limpyo", english: "clean", type: 'verb' },
  { root: "plant", english: "plant", type: 'verb' },
  { root: "ani", english: "harvest", type: 'verb' },
  { root: "pangisda", english: "go fishing", type: 'verb' },
  { root: "pangayam", english: "go hunting", type: 'verb' },
  { root: "labada", english: "do laundry", type: 'verb' },
  { root: "plantsa", english: "iron clothes", type: 'verb' },
  { root: "tambay", english: "hang out", type: 'verb' },
  { root: "chismis", english: "gossip", type: 'verb' },
  { root: "biyahe", english: "travel", type: 'verb' },
  { root: "pusta", english: "bet", type: 'verb' },
  { root: "sugol", english: "send/errand", type: 'verb' },
  { root: "hagad", english: "invite/summon", type: 'verb' },
  { root: "pakig", english: "interact with", type: 'verb' },
  { root: "pangalaga", english: "take care of", type: 'verb' },
  { root: "pasalamat", english: "express thanks", type: 'verb' },
  { root: "pangamuyo", english: "pray", type: 'verb' },
  { root: "mag-ampo", english: "pray", type: 'verb' },
  { root: "pasensyahi", english: "forgive/be patient", type: 'verb' },
  { root: "hinloan", english: "clean it", type: 'verb' },
  { root: "pungaw", english: "end/finish", type: 'verb' },
  { root: "tikang", english: "start/begin", type: 'verb' },
  { root: "paagi", english: "pass by", type: 'verb' },
  { root: "pabayaan", english: "leave alone/abandon", type: 'verb' },
  { root: "hampang", english: "play/game", type: 'verb' },

  // MORE NOUNS
  { root: "tindera", english: "female vendor", type: 'noun' },
  { root: "tindero", english: "male vendor", type: 'noun' },
  { root: "trabaho", english: "work/job", type: 'noun' },
  { root: "negosyo", english: "business", type: 'noun' },
  { root: "lista", english: "list", type: 'noun' },
  { root: "resibo", english: "receipt", type: 'noun' },
  { root: "kontrato", english: "contract", type: 'noun' },
  { root: "paandam", english: "preparation", type: 'noun' },
  { root: "kaigo", english: "enough", type: 'noun' },
  { root: "kaulitawo", english: "youth/young person", type: 'noun' },
  { root: "kababayan", english: "townsman/countryman", type: 'noun' },
  { root: "barangay", english: "village/district", type: 'noun' },
  { root: "kapitan", english: "village chief", type: 'noun' },
  { root: "kapulisan", english: "police station", type: 'noun' },
  { root: "munisipyo", english: "city hall", type: 'noun' },
  { root: "botika", english: "pharmacy", type: 'noun' },
  { root: "panaderya", english: "bakery", type: 'noun' },
  { root: "karinderya", english: "eatery/food stall", type: 'noun' },
  { root: "sari-sari", english: "variety store", type: 'noun' },
  { root: "panaderia", english: "bakery", type: 'noun' },

  // MORE FOOD
  { root: "champorado", english: "chocolate rice porridge", type: 'food' },
  { root: "lugaw", english: "rice porridge/congee", type: 'food' },
  { root: "arroz caldo", english: "chicken rice porridge", type: 'food' },
  { root: "longganisa", english: "sausage", type: 'food' },
  { root: "tocino", english: "sweet cured pork", type: 'food' },
  { root: "tinola", english: "chicken ginger soup", type: 'food' },
  { root: "dinuguan", english: "pork blood stew", type: 'food' },
  { root: "kare-kare", english: "peanut stew", type: 'food' },
  { root: "inasal", english: "grilled (chicken)", type: 'food' },
  { root: "chicharon", english: "pork rinds", type: 'food' },
  { root: "balut", english: "fertilized duck egg", type: 'food' },
  { root: "bagoong", english: "fermented fish paste", type: 'food' },
  { root: "atchara", english: "pickled papaya", type: 'food' },
  { root: "ensalada", english: "salad", type: 'food' },
  { root: "ice cream", english: "ice cream", type: 'food' },
  { root: "softdrinks", english: "soft drinks/soda", type: 'food' },
  { root: "juice", english: "juice", type: 'food' },
  { root: "beer", english: "beer", type: 'food' },
  { root: "alak", english: "alcohol/wine", type: 'food' },
  { root: "bibingka", english: "rice cake", type: 'food' },
  { root: "suman", english: "sticky rice cake", type: 'food' },
  { root: "biko", english: "sweet rice cake", type: 'food' },
  { root: "ginataan", english: "coconut milk dish", type: 'food' },

  // MORE ADJECTIVES
  { root: "madamo", english: "many/a lot", type: 'adj' },
  { root: "basa", english: "wet", type: 'adj' },
  { root: "matig-a", english: "hard/tough", type: 'adj' },
  { root: "malumo", english: "soft", type: 'adj' },
  { root: "matamis", english: "sweet", type: 'adj' },
  { root: "maaspang", english: "sour", type: 'adj' },
  { root: "maalat", english: "salty", type: 'adj' },
  { root: "maanghang", english: "spicy/hot", type: 'adj' },
  { root: "malipa", english: "fun/enjoyable", type: 'adj' },
  { root: "mabaho", english: "smelly/bad odor", type: 'adj' },
  { root: "mahumot", english: "fragrant/good smell", type: 'adj' },
  { root: "mabakod", english: "fenced", type: 'adj' },
  { root: "madagum", english: "many/thick", type: 'adj' },
  { root: "malinaw", english: "clear", type: 'adj' },
  { root: "madulom", english: "dark", type: 'adj' },
  { root: "maagahon", english: "early", type: 'adj' },
  { root: "malambo", english: "prosperous/rainy", type: 'adj' },
  { root: "masinulagon", english: "kind/gentle", type: 'adj' },
  { root: "maalam", english: "smart/clever", type: 'adj' },
  { root: "matarong", english: "honest/righteous", type: 'adj' },
  { root: "malaut", english: "evil/bad", type: 'adj' },
  { root: "maigo", english: "enough", type: 'adj' },

  // HEALTH MORE
  { root: "ulo nga masakit", english: "headache", type: 'medical' },
  { root: "tiyan nga masakit", english: "stomachache", type: 'medical' },
  { root: "ngipon nga masakit", english: "toothache", type: 'medical' },
  { root: "tuka", english: "poop/bowel movement", type: 'medical' },
  { root: "ihi", english: "urinate", type: 'medical' },
  { root: "suka", english: "vomit", type: 'medical' },
  { root: "allergy", english: "allergy", type: 'medical' },
  { root: "asthma", english: "asthma", type: 'medical' },
  { root: "diabetes", english: "diabetes", type: 'medical' },
  { root: "high blood", english: "high blood pressure", type: 'medical' },
  { root: "parsela", english: "pill/tablet", type: 'medical' },
  { root: "sirupe", english: "syrup (medicine)", type: 'medical' },
  { root: "meron", english: "lotion", type: 'medical' },
  { root: "bandage", english: "bandage", type: 'medical' },
  { root: "thermometer", english: "thermometer", type: 'medical' },
];

export const COMMON_PHRASES: { ilonggo: string; english: string; category: string }[] = [
  // GREETINGS & BASICS
  { ilonggo: "kamusta ka?", english: "how are you?", category: "greeting" },
  { ilonggo: "maayo man", english: "I'm fine", category: "greeting" },
  { ilonggo: "maayong adlaw sa imo", english: "good day to you", category: "greeting" },
  { ilonggo: "diin ka halin?", english: "where are you from?", category: "greeting" },
  { ilonggo: "taga-diin ka?", english: "where are you from?", category: "greeting" },
  { ilonggo: "taga-England ako", english: "I'm from England", category: "greeting" },
  { ilonggo: "namit gid", english: "very delicious", category: "food" },
  { ilonggo: "kaon na kita", english: "let's eat", category: "food" },
  { ilonggo: "gutom na ako", english: "I'm hungry", category: "food" },
  { ilonggo: "busog na ako", english: "I'm full", category: "food" },
  { ilonggo: "asa ang banyo?", english: "where is the bathroom?", category: "place" },
  { ilonggo: "pila ni?", english: "how much is this?", category: "money" },
  { ilonggo: "mahal gid ni", english: "this is too expensive", category: "money" },
  { ilonggo: "pwede pa barato?", english: "can it be cheaper?", category: "money" },
  { ilonggo: "isa ka plato sang kan-on", english: "one plate of rice", category: "food" },
  { ilonggo: "duha ka bote sang tubig", english: "two bottles of water", category: "food" },
  { ilonggo: "palihog tabangi ako", english: "please help me", category: "emergency" },
  { ilonggo: "hulat lang", english: "just wait", category: "basic" },
  { ilonggo: "kadto kita", english: "let's go", category: "basic" },
  { ilonggo: "uli na kita", english: "let's go home", category: "basic" },
  { ilonggo: "diin ang merkado?", english: "where is the market?", category: "place" },
  { ilonggo: "asa ang tindahan?", english: "where is the store?", category: "place" },
  { ilonggo: "diri sa sulod", english: "here inside", category: "place" },
  { ilonggo: "gwa lang", english: "just outside", category: "place" },
  { ilonggo: "lapit lang", english: "just nearby/close", category: "place" },
  { ilonggo: "malayo pa", english: "still far", category: "place" },
  { ilonggo: "diretso lang", english: "just go straight", category: "directions" },
  { ilonggo: "liko sa tuo", english: "turn right", category: "directions" },
  { ilonggo: "liko sa wala", english: "turn left", category: "directions" },
  { ilonggo: "sa likod sang balay", english: "behind the house", category: "directions" },
  { ilonggo: "sa atubangan sang eskuelahan", english: "in front of the school", category: "directions" },
  { ilonggo: "salamat gid", english: "thank you very much", category: "social" },
  { ilonggo: "walay ano man", english: "you're welcome / no problem", category: "social" },
  { ilonggo: "pasensya na", english: "I'm sorry", category: "social" },
  { ilonggo: "wala problema", english: "no problem", category: "social" },
  { ilonggo: "hibalo ko", english: "I know", category: "basic" },
  { ilonggo: "indi ko hibalo", english: "I don't know", category: "basic" },
  { ilonggo: "intindihon ko", english: "I understand", category: "basic" },
  { ilonggo: "indi ko intindi", english: "I don't understand", category: "basic" },
  { ilonggo: "wala ako kwarta", english: "I don't have money", category: "money" },
  { ilonggo: "pabor man", english: "please (favor)", category: "basic" },
  { ilonggo: "asa ang tricycle?", english: "where is the tricycle?", category: "transport" },
  { ilonggo: "sakay kita sang dyip", english: "let's ride the jeepney", category: "transport" },
  { ilonggo: "sa diin ang estasyon?", english: "where is the station?", category: "transport" },
  { ilonggo: "pila ang pamasahe?", english: "how much is the fare?", category: "transport" },
  { ilonggo: "paabot sa merkado", english: "take me to the market", category: "transport" },
  { ilonggo: "lugsong ako diri", english: "I'll get off here", category: "transport" },
  { ilonggo: "maasikaso ko sa imo", english: "I'll take care of you", category: "social" },
  { ilonggo: "palangga ko sa imo", english: "I love you", category: "social" },
  { ilonggo: "diin ang ospital?", english: "where is the hospital?", category: "emergency" },
  { ilonggo: "nagsakit ako", english: "I'm in pain", category: "medical" },
  { ilonggo: "kinahanglan ko sang doktor", english: "I need a doctor", category: "medical" },
  { ilonggo: "nagkalagnat ako", english: "I have a fever", category: "medical" },
  { ilonggo: "tawag sang pulis", english: "call the police", category: "emergency" },
  { ilonggo: "tabang! tabang!", english: "help! help!", category: "emergency" },
  { ilonggo: "ano ang imo ngalan?", english: "what is your name?", category: "greeting" },
  { ilonggo: "si John ang akon ngalan", english: "my name is John", category: "greeting" },
  { ilonggo: "lipaya gid ikaw", english: "I'm very happy to see you", category: "social" },
  { ilonggo: "maayo gid ini", english: "this is very good", category: "basic" },
  { ilonggo: "malain ini", english: "this is bad", category: "basic" },
  { ilonggo: "asa ka pa?", english: "where have you been?", category: "greeting" },
  { ilonggo: "ligad lang", english: "just before/recently", category: "time" },
  { ilonggo: "karun lang", english: "just today", category: "time" },
  { ilonggo: "maaga pa", english: "still early", category: "time" },
  { ilonggo: "gab-i na", english: "it's already night", category: "time" },
  { ilonggo: "san-o ka umaabot?", english: "when will you arrive?", category: "time" },
  { ilonggo: "abot ko maaga", english: "I'll arrive tomorrow", category: "time" },
  { ilonggo: "gahu ako nakaabot", english: "I arrived yesterday", category: "time" },
  { ilonggo: "pila ka adlaw ka?", english: "how old are you? (literally: how many days?)", category: "question" },
  { ilonggo: "asa ang imo pamilya?", english: "where is your family?", category: "family" },
  { ilonggo: "asa ang imo asawa?", english: "where is your spouse?", category: "family" },
  { ilonggo: "kon-o kita makita?", english: "when can we meet?", category: "social" },
  { ilonggo: "dali lang", english: "just quick/hurry", category: "basic" },
  { ilonggo: "mahinay lang", english: "take it slow", category: "basic" },
  { ilonggo: "palihog hambali ko", english: "please tell me", category: "basic" },
  { ilonggo: "pamangkot lang ko", english: "I just want to ask", category: "basic" },
  { ilonggo: "ano ini?", english: "what is this?", category: "question" },
  { ilonggo: "ano iyan?", english: "what is that?", category: "question" },
  { ilonggo: "sin-o iyan?", english: "who is that?", category: "question" },
  { ilonggo: "asa siya?", english: "where is he/she?", category: "question" },
  { ilonggo: "bayad na ko", english: "I've already paid", category: "money" },
  { ilonggo: "pila ang sukli?", english: "how much is the change?", category: "money" },
  { ilonggo: "diskwento diay?", english: "is there a discount?", category: "money" },
  { ilonggo: "bakal ko sini", english: "I'll buy this", category: "money" },
  { ilonggo: "indi ko gusto ini", english: "I don't want this", category: "basic" },
  { ilonggo: "gusto ko sini", english: "I want this", category: "basic" },
  { ilonggo: "namit gid ang pagkaon", english: "the food is very delicious", category: "food" },
  { ilonggo: "luto ta", english: "let's cook", category: "food" },
  { ilonggo: "hugas sang pinggan", english: "wash the dishes", category: "food" },
  { ilonggo: "kaon ta sa gwa", english: "let's eat outside", category: "food" },
  { ilonggo: "tulog na kita", english: "let's sleep", category: "basic" },
  { ilonggo: "mata ka na", english: "wake up now", category: "basic" },
  { ilonggo: "bangon ka na", english: "get up now", category: "basic" },
  { ilonggo: "lingkod ka diri", english: "sit here", category: "basic" },
  { ilonggo: "nag-ulan", english: "it's raining", category: "weather" },
  { ilonggo: "bagyo gid karun", english: "big storm today", category: "weather" },
  { ilonggo: "mainit gid karun", english: "it's really hot today", category: "weather" },
  { ilonggo: "wala sang kuryente", english: "there's no electricity", category: "basic" },
  { ilonggo: "abli sang pultahan", english: "open the door", category: "basic" },
  { ilonggo: "sarado sang bintana", english: "close the window", category: "basic" },
  { ilonggo: "asa ang lamisa?", english: "where is the table?", category: "place" },
  { ilonggo: "labada na karun", english: "do laundry now", category: "basic" },
  { ilonggo: "luto ka karun", english: "you cook now", category: "food" },
  { ilonggo: "pangita sang tubig", english: "look for water", category: "basic" },
  { ilonggo: "tawag sa nanay", english: "call mom", category: "family" },
  { ilonggo: "tawag sa tatay", english: "call dad", category: "family" },
  { ilonggo: "pabilin ka diri", english: "stay here", category: "basic" },
  { ilonggo: "indi ka kadto", english: "don't go", category: "basic" },
  { ilonggo: "halina na", english: "let's leave now / hurry up", category: "basic" },
  { ilonggo: "paandam na kita", english: "let's get ready", category: "basic" },
  { ilonggo: "pangamuyo ta", english: "let's pray", category: "social" },
  { ilonggo: "maayong pagtulug", english: "good night (sleep well)", category: "social" },
  { ilonggo: "maayong pagmata", english: "good morning (upon waking)", category: "social" },
  { ilonggo: "komusta ang pamilya?", english: "how's the family?", category: "greeting" },
  { ilonggo: "anong balita?", english: "what's the news?", category: "greeting" },
  { ilonggo: "wala naman", english: "nothing much", category: "greeting" },
  { ilonggo: "sige, salamat", english: "okay, thank you", category: "social" },
  { ilonggo: "pwede bala?", english: "is it possible? / can I?", category: "question" },
  { ilonggo: "pwede man", english: "yes you can / it's okay", category: "social" },
  { ilonggo: "indi pwede", english: "not allowed", category: "social" },
  { ilonggo: "grabe gid ka maayo", english: "you're so kind", category: "social" },
  { ilonggo: "grabe gid ka matahum", english: "you're so beautiful", category: "social" },
  { ilonggo: "namit gid ini nga pagkaon", english: "this food is so delicious", category: "food" },
  { ilonggo: "pila ka tawo?", english: "how many people?", category: "question" },
  { ilonggo: "duha ka tawo lang", english: "just two people", category: "food" },
  { ilonggo: "resibo palihog", english: "receipt please", category: "money" },
  { ilonggo: "pabilin ko diri", english: "I'll stay here", category: "basic" },
  { ilonggo: "ulian mo ako", english: "take me home", category: "transport" },
  { ilonggo: "sa diin kita makita?", english: "where shall we meet?", category: "social" },
  { ilonggo: "sa merkado kita", english: "let's meet at the market", category: "social" },
  { ilonggo: "karun lang bala", english: "just today only", category: "time" },
  { ilonggo: "sunod semana", english: "next week", category: "time" },
  { ilonggo: "maaga bala ka?", english: "are you early?", category: "time" },
  { ilonggo: "asa ka nagatrabaho?", english: "where do you work?", category: "question" },
  { ilonggo: "asa ka nagakaon?", english: "where are you eating?", category: "food" },
  { ilonggo: "kinahanglan ko sang...", english: "I need...", category: "basic" },
  { ilonggo: "gusto ko sang...", english: "I want...", category: "basic" },
  { ilonggo: "indi ko gusto...", english: "I don't want...", category: "basic" },
  { ilonggo: "tabangi ako palihog", english: "please help me", category: "emergency" },
  { ilonggo: "diin ang pinaka-lapit nga botika?", english: "where's the nearest pharmacy?", category: "medical" },
  { ilonggo: "may bulong ka bala?", english: "do you have medicine?", category: "medical" },
  { ilonggo: "masakit ang akon ulo", english: "I have a headache", category: "medical" },
  { ilonggo: "masakit ang akon tiyan", english: "I have a stomachache", category: "medical" },
  { ilonggo: "masakit ang akon ngipon", english: "I have a toothache", category: "medical" },
  { ilonggo: "nagkalagnat ako", english: "I have a fever", category: "medical" },
  { ilonggo: "nagauubo ako", english: "I'm coughing", category: "medical" },
  { ilonggo: "sige lang, indi problema", english: "go ahead, no problem", category: "social" },
  { ilonggo: "hay up, kadto na kita!", english: "come on, let's go!", category: "social" },
  { ilonggo: "ay nako! indi gid!", english: "oh no! really not!", category: "social" },
  { ilonggo: "hala! asa na?", english: "oh no! where now?", category: "social" },
  { ilonggo: "ara diri", english: "here it is (showing)", category: "basic" },
  { ilonggo: "arato didto", english: "there it is (pointing)", category: "basic" },
  { ilonggo: "sige, sige!", english: "sure, sure!", category: "social" },
  { ilonggo: "chalang lang", english: "it's fine / alright", category: "social" },
  { ilonggo: "ano pa ang gusto mo?", english: "what else do you want?", category: "question" },
  { ilonggo: "wala na, salamat", english: "nothing else, thanks", category: "food" },
  { ilonggo: "isa pa palihog", english: "one more please", category: "food" },
  { ilonggo: "duha pa", english: "two more", category: "food" },
  { ilonggo: "kaon ta sa karinderya", english: "let's eat at the eatery", category: "food" },
  { ilonggo: "asa ang pinaka-maayo nga karinderya?", english: "where's the best eatery?", category: "food" },
  { ilonggo: "palihog ipa-asa ini", english: "please send this there", category: "basic" },
  { ilonggo: "dumdoma ako sa imo", english: "remember me", category: "social" },
  { ilonggo: "wala ko malimot sa imo", english: "I won't forget you", category: "social" },
  { ilonggo: "palangga gid ko sa imo", english: "I really love you", category: "social" },
  { ilonggo: "ikaw ang akon tanan", english: "you are my everything", category: "social" },
  { ilonggo: "lipaya gid nga naka-kitakita", english: "so happy we met", category: "social" },
  { ilonggo: "malipayon kita", english: "we are happy", category: "social" },
  { ilonggo: "pabakal kamo?", english: "are you buying? / are you selling?", category: "money" },
  { ilonggo: "pila ang tanan?", english: "how much for everything?", category: "money" },
  { ilonggo: "pwede pa barato bala?", english: "can you make it cheaper?", category: "money" },
  { ilonggo: "diskwento para sa ako bala?", english: "can I get a discount?", category: "money" },
];

function findPhraseMatch(text: string): string | null {
  const lower = text.toLowerCase().trim();
  for (const phrase of COMMON_PHRASES) {
    if (lower === phrase.ilonggo.toLowerCase() || lower === phrase.english.toLowerCase()) {
      return phrase.english;
    }
  }
  return null;
}

function findReversePhrase(english: string): string | null {
  const lower = english.toLowerCase().trim();
  for (const phrase of COMMON_PHRASES) {
    if (lower === phrase.english.toLowerCase()) {
      return phrase.ilonggo;
    }
  }
  return null;
}

function findGlossaryMatch(word: string, glossary: any[], targetLang: 'English' | 'Ilonggo'): string | null {
  if (!glossary || glossary.length === 0) return null;
  const lower = word.toLowerCase().trim();
  if (targetLang === 'English') {
    const found = glossary.find((item: any) => item.ilonggo?.toLowerCase() === lower);
    return found?.english || null;
  }
  const found = glossary.find((item: any) => item.english?.toLowerCase() === lower);
  return found?.ilonggo || null;
}

export function translateOffline(
  text: string,
  targetLang: 'English' | 'Ilonggo',
  glossary?: any[]
): string {
  if (!text) return "";

  const trimmed = text.trim();
  const lower = trimmed.toLowerCase();

  // 1. Check phrase-level match first
  if (targetLang === 'English') {
    const phraseMatch = findPhraseMatch(trimmed);
    if (phraseMatch) return phraseMatch.charAt(0).toUpperCase() + phraseMatch.slice(1);
  } else {
    const reverseMatch = findReversePhrase(trimmed);
    if (reverseMatch) return reverseMatch.charAt(0).toUpperCase() + reverseMatch.slice(1);
  }

  // 2. Check user glossary (learned corrections)
  if (glossary && glossary.length > 0) {
    const glossaryMatch = findGlossaryMatch(trimmed, glossary, targetLang);
    if (glossaryMatch) return glossaryMatch.charAt(0).toUpperCase() + glossaryMatch.slice(1);
  }

  // 3. Word-by-word translation with affix deconstruction
  const words = lower.split(/\s+/);
  const result: string[] = [];
  let hasUnknown = false;

  for (let word of words) {
    const cleanWord = word.replace(/[?.!,;:'"()]/g, "");
    if (!cleanWord) continue;

    let translation = cleanWord;
    let found = false;

    if (targetLang === 'English') {
      // Direct dictionary lookup
      const direct = COMPREHENSIVE_DICTIONARY.find(d => d.root === cleanWord);
      if (direct) {
        translation = direct.english;
        found = true;
      } else {
        // Affix stripping
        for (const rule of AFFIX_RULES) {
          if (found) break;
          if ('prefix' in rule && rule.prefix && cleanWord.startsWith(rule.prefix)) {
            const root = cleanWord.substring(rule.prefix.length);
            const match = COMPREHENSIVE_DICTIONARY.find(d => d.root === root);
            if (match) {
              if ('tense' in rule) {
                if (rule.tense === 'past') translation = `${match.english}ed`;
                else if (rule.tense === 'present') translation = `is ${match.english}ing`;
                else if (rule.tense === 'future') translation = `will ${match.english}`;
              } else {
                translation = match.english;
              }
              found = true;
            }
          }
          if ('suffix' in rule && rule.suffix && cleanWord.endsWith(rule.suffix)) {
            const root = cleanWord.substring(0, cleanWord.length - rule.suffix.length);
            const match = COMPREHENSIVE_DICTIONARY.find(d => d.root === root);
            if (match) {
              translation = match.english;
              found = true;
            }
          }
          if ('infix' in rule && rule.infix) {
            const infixPos = cleanWord.indexOf(rule.infix);
            if (infixPos > 0 && infixPos < 3) {
              const root = cleanWord.substring(0, infixPos) + cleanWord.substring(infixPos + rule.infix.length);
              const match = COMPREHENSIVE_DICTIONARY.find(d => d.root === root);
              if (match) {
                translation = `${match.english} (past)`;
                found = true;
              }
            }
          }
        }
      }

      if (!found) {
        // Check learned glossary for individual words
        if (glossary && glossary.length > 0) {
          const wordGlossary = findGlossaryMatch(cleanWord, glossary, 'English');
          if (wordGlossary) {
            translation = wordGlossary;
            found = true;
          }
        }
      }

      if (!found) {
        translation = `[${cleanWord}?]`;
        hasUnknown = true;
      }
    } else {
      // English to Ilonggo
      const match = COMPREHENSIVE_DICTIONARY.find(d => d.english.toLowerCase() === cleanWord);
      if (match) {
        translation = match.root;
        found = true;
      }

      if (!found) {
        if (glossary && glossary.length > 0) {
          const wordGlossary = findGlossaryMatch(cleanWord, glossary, 'Ilonggo');
          if (wordGlossary) {
            translation = wordGlossary;
            found = true;
          }
        }
      }

      if (!found) {
        translation = `[${cleanWord}?]`;
        hasUnknown = true;
      }
    }

    result.push(translation);
  }

  let final = result.join(' ');
  final = final.charAt(0).toUpperCase() + final.slice(1);

  if (hasUnknown) {
    final += " (some words unknown)";
  }

  return final;
}

export function addWordToGlossary(ilonggo: string, english: string): void {
  try {
    const saved = localStorage.getItem('ilonggolink_glossary');
    const glossary = saved ? JSON.parse(saved) : [];
    const existing = glossary.findIndex((item: any) => item.ilonggo.toLowerCase() === ilonggo.toLowerCase());
    if (existing >= 0) {
      glossary[existing] = { ilonggo, english, learnedAt: Date.now() };
    } else {
      glossary.push({ ilonggo, english, learnedAt: Date.now() });
    }
    localStorage.setItem('ilonggolink_glossary', JSON.stringify(glossary));
  } catch (e) {
    console.error('Failed to save glossary entry:', e);
  }
}

export function getGlossary(): { ilonggo: string; english: string; learnedAt: number }[] {
  try {
    const saved = localStorage.getItem('ilonggolink_glossary');
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
  }
}

export function deleteFromGlossary(ilonggo: string): void {
  try {
    const glossary = getGlossary();
    const filtered = glossary.filter(item => item.ilonggo.toLowerCase() !== ilonggo.toLowerCase());
    localStorage.setItem('ilonggolink_glossary', JSON.stringify(filtered));
  } catch (e) {
    console.error('Failed to delete glossary entry:', e);
  }
}

export function saveCorrection(original: string, wrongTranslation: string, correctTranslation: string): void {
  addWordToGlossary(original, correctTranslation);
  try {
    const saved = localStorage.getItem('ilonggolink_corrections');
    const corrections = saved ? JSON.parse(saved) : [];
    corrections.unshift({
      original,
      wrongTranslation,
      correctTranslation,
      timestamp: Date.now()
    });
    localStorage.setItem('ilonggolink_corrections', JSON.stringify(corrections.slice(0, 50)));
  } catch (e) {
    console.error('Failed to save correction:', e);
  }
}

export function getCorrections(): { original: string; wrongTranslation: string; correctTranslation: string; timestamp: number }[] {
  try {
    const saved = localStorage.getItem('ilonggolink_corrections');
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
  }
}

export function saveHistory(original: string, translated: string): void {
  try {
    const saved = localStorage.getItem('ilonggolink_history');
    const history = saved ? JSON.parse(saved) : [];
    history.unshift({ original, translated, timestamp: Date.now() });
    localStorage.setItem('ilonggolink_history', JSON.stringify(history.slice(0, 20)));
  } catch (e) {
    console.error('Failed to save history:', e);
  }
}

export function getHistory(): { original: string; translated: string; timestamp: number }[] {
  try {
    const saved = localStorage.getItem('ilonggolink_history');
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
  }
}

export function clearAllLocalData(): void {
  try {
    localStorage.removeItem('ilonggolink_glossary');
    localStorage.removeItem('ilonggolink_corrections');
    localStorage.removeItem('ilonggolink_history');
  } catch (e) {
    console.error('Failed to clear local data:', e);
  }
}

export const CATEGORY_LABELS: Record<string, string> = {
  greeting: 'Greetings',
  food: 'Food',
  money: 'Shopping',
  place: 'Places',
  directions: 'Directions',
  social: 'Social',
  emergency: 'Emergency',
  medical: 'Medical',
  transport: 'Transport',
  family: 'Family',
  time: 'Time',
  question: 'Questions',
  basic: 'Basics',
};

export function getPhrasesByCategory(category: string) {
  return COMMON_PHRASES.filter(p => p.category === category);
}

export function getAllCategories() {
  return [...new Set(COMMON_PHRASES.map(p => p.category))];
}
