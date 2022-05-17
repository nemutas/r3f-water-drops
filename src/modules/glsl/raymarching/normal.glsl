//---------------------------------------------------------
// This function is based on the Inigo Quilez article.
// https://iquilezles.org/articles/normalsSDF/
//---------------------------------------------------------

// this function must be define after sdf.
vec3 calcNormal(in vec3 p) {
  const float h = 0.0001;
  const vec2 k = vec2(1, -1) * h;
  return normalize( k.xyy * sdf( p + k.xyy ) + 
                    k.yyx * sdf( p + k.yyx ) + 
                    k.yxy * sdf( p + k.yxy ) + 
                    k.xxx * sdf( p + k.xxx ) );
}