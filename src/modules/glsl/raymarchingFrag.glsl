// AMOUNT replaces at call position

struct Data {
  vec3 position;
  float scale;
};

uniform float u_aspect;
uniform Data u_datas[AMOUNT];
uniform sampler2D u_texture;
uniform vec2 u_uvScale;
varying vec2 v_uv;

const int COUNT = AMOUNT;

#include './fresnel.glsl'
#include './raymarching/primitives.glsl'
#include './raymarching/combinations.glsl'

float sdf(vec3 p) {
  vec3 correct = vec3(u_aspect, 1.0, 1.0) * vec3(0.08, 0.15, 0.2);

  vec3 pos = p + -u_datas[0].position * correct;
  float final = sdSphere(pos, 0.2 * u_datas[0].scale);

  for(int i = 1; i < COUNT; i++) {
		pos = p + -u_datas[i].position * correct;
		float sphere = sdSphere(pos, 0.2 * u_datas[i].scale);
    final = opSmoothUnion(final, sphere, 0.4);
  }

  return final;
}

#include './raymarching/normal.glsl'

void main() {
  vec2 centeredUV = (v_uv - 0.5) * vec2(u_aspect, 1.0);
  vec3 ray = normalize(vec3(centeredUV, -1.0));
  
  vec3 camPos = vec3(0.0, 0.0, 2.3);
  vec3 rayPos = camPos;
  float totalDist = 0.0;
  float tMax = 5.0;

  for(int i = 0; i < 256; i++) {
    float dist = sdf(rayPos);
    if (dist < 0.0001 || tMax < totalDist) break;
    totalDist += dist;
    rayPos = camPos + totalDist * ray;
  }

  vec2 uv = (v_uv - 0.5) * u_uvScale + 0.5;
  vec4 tex = texture2D(u_texture, uv);
  tex = vec4(vec3((tex.r + tex.g + tex.b) / 3.0), tex.a);
  vec4 outgoing = tex;

  if(totalDist < tMax) {
    vec3 normal = calcNormal(rayPos);    
    float f = fresnel(ray, normal);

    float len = pow(length(normal.xy), 3.0);
    uv += normal.xy * len * 0.1;

    tex = texture2D(u_texture, uv);
    tex += f * 0.3;
    outgoing = tex;
  }
  
  gl_FragColor = outgoing;
}