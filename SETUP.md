# Korean Legal Chatbot - Setup Guide

## 프로젝트 구조

```
.
├── src/                          # MCP 서버 소스 코드
│   ├── index.ts                  # MCP 서버 진입점
│   ├── cli.ts                    # CLI 진입점
│   ├── lib/                      # 핵심 로직
│   ├── tools/                    # MCP 도구 정의
│   └── server/                   # 서버 설정
├── app/                          # Next.js 웹 앱
│   ├── api/chat/route.ts         # 채팅 API 엔드포인트
│   ├── layout.tsx                # 루트 레이아웃
│   ├── page.tsx                  # 메인 페이지
│   └── globals.css               # 글로벌 스타일
├── components/                   # React 컴포넌트
│   ├── chat-container.tsx        # 채팅 UI 컨테이너
│   ├── chat-message.tsx          # 메시지 표시
│   ├── chat-input.tsx            # 입력 폼
│   ├── markdown-message.tsx      # 마크다운 렌더러
│   └── tool-debug.tsx            # 도구 디버깅 패널
├── lib/                          # 유틸리티
│   ├── prompts.ts                # 시스템 프롬프트
│   ├── markdown.ts               # 마크다운 설정
│   └── mcp-client.ts             # MCP 클라이언트
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
└── README.md
```

## 시작하기

### 1단계: 법제처 API 키 발급

1. [법제처 Open API 신청 페이지](https://open.law.go.kr/LSO/openApi/guideList.do)에 접속
2. 회원가입 및 로그인
3. "Open API 사용 신청" 클릭
4. API 인증키(OC) 발급받기

### 2단계: 환경 변수 설정

```bash
cp .env.example .env.local
```

`.env.local` 파일을 편집하여:
- `LAW_OC`: 법제처 API 키 입력
- `OPENAI_API_KEY`: OpenAI API 키 입력 (sk_test_...)
- `KOREAN_LAW_MCP_URL`: MCP 서버 URL (로컬 테스트 시 http://localhost:3001)

### 3단계: 의존성 설치

```bash
# pnpm 권장
pnpm install

# 또는 npm
npm install
```

### 4단계: MCP 서버와 웹 앱 실행

#### 옵션 A: 동시 실행 (권장)
```bash
npm run dev:all
```

#### 옵션 B: 개별 실행

터미널 1 (MCP 서버):
```bash
npm run dev:mcp
# 또는
npm run start:sse  # SSE 모드로 시작
```

터미널 2 (웹 앱):
```bash
npm run dev
```

### 5단계: 브라우저 접속

웹 앱: http://localhost:3000
MCP 서버 (SSE): http://localhost:3000/mcp

## 일반적인 명령어

```bash
# MCP 서버 빌드
npm run build

# MCP 서버 시작 (프로덕션)
npm run start

# CLI 도구 사용
npm run cli -- --help

# Next.js 빌드
npm run build:web

# Next.js 프로덕션 실행
npm run start:web
```

## 트러블슈팅

### MCP 서버 연결 안 됨

1. MCP 서버가 실행 중인지 확인
```bash
curl http://localhost:3001
```

2. `KOREAN_LAW_MCP_URL` 환경 변수 확인
```bash
echo $KOREAN_LAW_MCP_URL
```

3. 포트 충돌 확인 (3001 또는 3000이 사용 중인지)

### OpenAI API 오류

1. API 키가 올바른지 확인
2. 계정에 충분한 크레딧이 있는지 확인
3. API 엔드포인트 설정 확인

### Next.js 빌드 오류

TypeScript 오류가 발생하면:
```bash
npm run build:web -- --no-lint
```

## 개발 팁

### 도구 디버깅

웹 앱의 메시지에서 "Debug Information" 섹션을 확장하면 MCP 도구 호출 내역을 볼 수 있습니다.

### 커스텀 프롬프트

`lib/prompts.ts`에서 시스템 프롬프트를 수정하여 AI의 동작을 커스터마이징할 수 있습니다.

### 마크다운 설정

`lib/markdown.ts`에서 마크다운 렌더러 설정을 변경할 수 있습니다.

## 배포

### Vercel에 배포

```bash
# GitHub에 푸시
git push

# Vercel에서 GitHub 저장소 연결
# 자동으로 빌드/배포됨
```

**환경 변수 설정:**
Vercel 프로젝트 설정에서 다음 환경 변수 추가:
- `KOREAN_LAW_MCP_URL`: MCP 서버 URL (퍼블릭 또는 프라이빗)
- `OPENAI_API_KEY`: OpenAI API 키

## 프로덕션 체크리스트

- [ ] OpenAI API 키 설정
- [ ] 법제처 API 키 설정
- [ ] MCP 서버 URL 설정
- [ ] 환경 변수 .env.local은 gitignore에 포함됨
- [ ] 빌드 확인: `npm run build && npm run build:web`
- [ ] 법률 면책 조항 확인 (components/chat-container.tsx)

## 라이선스

MIT
