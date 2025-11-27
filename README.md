# Nexo App

Aplicativo mobile de acessibilidade inspirado no Waze, desenvolvido com React Native + Expo, focado em mapear pontos acessíveis e não acessíveis para diferentes tipos de deficiência.

## Funcionalidades

- Mapa interativo com marcadores de acessibilidade (positivo/negativo)
- Adição de marcadores via modal e seleção de tipo de deficiência
- BottomSheet para detalhes do ponto selecionado
- FAB (botão flutuante) para adicionar novos pontos
- Autenticação e navegação com Expo Router
- Interface moderna com Gluestack UI e Tailwind CSS
- Toasts de feedback para ações do usuário

## Tecnologias

- [Expo](https://expo.dev/)
- [React Native](https://reactnative.dev/)
- [Expo Router](https://expo.github.io/router/)
- [@gorhom/bottom-sheet](https://github.com/gorhom/react-native-bottom-sheet)
- [Gluestack UI](https://ui.gluestack.io/)
- [Tailwind CSS](https://tailwindcss.com/) (via NativeWind)
- [React Native Maps](https://github.com/react-native-maps/react-native-maps)
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
- [React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/)
- [Axios](https://axios-http.com/)
- [React Native Toast Message](https://github.com/calintamas/react-native-toast-message)

## Estrutura de Pastas

```
app/                # Telas e rotas (Expo Router)
components/         # Componentes atômicos e de UI
assets/             # Imagens, ícones e fontes
constants/          # Constantes globais
services/           # Serviços (ex: storage, API)
```

## Scripts

- `npm start` — inicia o projeto Expo
- `npm run android` — inicia no Android
- `npm run ios` — inicia no iOS
- `npm run web` — inicia no navegador
- `npm run build` — build para web
- `npm test` — executa testes com Jest

## Como rodar

1. Instale as dependências:
   ```sh
   npm install
   ```
2. Rode o projeto:
   ```sh
   npm start
   ```
3. Siga as instruções do Expo para abrir no emulador ou dispositivo.

## Observações

- O projeto utiliza ESLint e Prettier para padronização de código.
- As imagens de deficiência estão em `assets/images/`.
- O mapeamento dos tipos de deficiência para português está em `app/map.tsx` via utilitário `getDebilityLabel`.
