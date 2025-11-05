// Minimal TypeScript test entry used to validate tsup + tsconfig
export const tsTest = {
  ok: true,
  message: 'TypeScript toolchain test'
};

export function getMessage() {
  return tsTest.message;
}
