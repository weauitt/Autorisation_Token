export async function GET() {
  const token = 'm3jfsr42km7'; 
  return new Response(JSON.stringify({ token }), { status: 200 });
}
