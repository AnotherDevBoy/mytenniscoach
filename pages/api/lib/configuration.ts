const Configuration = {
  supabaseUrl: process.env['NEXT_PUBLIC_SUPABASE_URL'] || '',
  supabaseKey: process.env['NEXT_API_KEY'] || '',
  jwtSecret: process.env['JWT_SECRET'] || ''
};

export default Configuration;
