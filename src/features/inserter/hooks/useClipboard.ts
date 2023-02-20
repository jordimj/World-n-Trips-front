import useSnackbar from './useSnackbar';

function useClipboard() {
  const { snackbar, openSnackbar } = useSnackbar();

  const checkIfClipboard = () => {
    if (!navigator?.clipboard) {
      openSnackbar([{ label: 'Clipboard not supported', severity: 'error' }]);
    }
  };

  const copyToClipboard = async (text: string) => {
    checkIfClipboard();

    try {
      await navigator.clipboard.writeText(text);
      openSnackbar([{ label: 'Copied to your clipboard!' }]);
    } catch (error) {
      openSnackbar([{ label: "Couldn't copy to your clipboard", severity: 'error' }]);
    }
  };

  const pasteFromClipboard = async () => {
    checkIfClipboard();

    try {
      const text = await navigator.clipboard.readText();
      openSnackbar([{ label: 'Pasted from your clipboard!' }]);
      return text;
    } catch (error) {
      openSnackbar([{ label: "Couldn't paste from your clipboard", severity: 'error' }]);
    }
  };

  return { copyToClipboard, pasteFromClipboard, snackbar };
}

export default useClipboard;
