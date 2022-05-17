//---------------------------------------------------------
// This function is based on the Inigo Quilez article.
// https://iquilezles.org/articles/distfunctions/
//---------------------------------------------------------

float sdSphere( vec3 p, float s ) {
  return length(p)-s;
}

float sdBox( vec3 p, vec3 b ) {
  vec3 q = abs(p) - b;
  return length(max(q,0.0)) + min(max(q.x,max(q.y,q.z)),0.0);
}