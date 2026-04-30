// lib/models.ts
// Static model definitions — no DB imports, safe for client components

export const SUPPORTED_MODELS = [
  {
    id: "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
    name: "Llama 3.1 8B Instruct",
    description: "Best for most logistics tasks. Fast inference, cost-effective.",
    paramCount: "8B",
    costPerMToken: 0.2,
    maxContextLength: 8192,
    recommended: true,
  },
  {
    id: "Qwen/Qwen2.5-7B-Instruct-Turbo",
    name: "Qwen 2.5 7B Instruct",
    description: "Strong multilingual model. Great for Hindi-English logistics.",
    paramCount: "7B",
    costPerMToken: 0.2,
    maxContextLength: 8192,
    recommended: false,
  },
  {
    id: "meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo",
    name: "Llama 3.1 70B Instruct",
    description: "Maximum capability for complex fleet & routing tasks.",
    paramCount: "70B",
    costPerMToken: 0.9,
    maxContextLength: 8192,
    recommended: false,
  },
  {
    id: "mistralai/Mistral-7B-Instruct-v0.3",
    name: "Mistral 7B Instruct v0.3",
    description: "Efficient European model, strong reasoning.",
    paramCount: "7B",
    costPerMToken: 0.2,
    maxContextLength: 8192,
    recommended: false,
  },
];
