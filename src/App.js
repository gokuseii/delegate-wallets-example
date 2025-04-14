import {
  usePrivy,
  useCreateWallet,
  useSolanaWallets,
  useDelegatedActions,
} from "@privy-io/react-auth";

function App() {
  const { ready, authenticated, user, login } = usePrivy();
  const { createWallet: createEthereumWallet } = useCreateWallet();
  const { createWallet: createSolanaWallet } = useSolanaWallets();
  const { delegateWallet, revokeWallets } = useDelegatedActions();

  if (!ready || !authenticated || !user) {
    return (
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={login}
      >
        Authorize
      </button>
    );
  }

  const ethereumWallets = user.linkedAccounts.filter(
    (acc) => acc.type === "wallet" && acc.chainType === "ethereum"
  );

  const solanaWallets = user.linkedAccounts.filter(
    (acc) => acc.type === "wallet" && acc.chainType === "solana"
  );

  const setupDelegation = (address, chainType) => {
    delegateWallet({ address, chainType })
      .then(() => {
        console.log("Successfully setup delegation");
      })
      .catch((error) => {
        console.error("Error occurred while setting up delegation:", error);
      });
  };

  const revokeDelegation = () => {
    revokeWallets()
      .then(() => {
        console.log("Delegation successfully revoked");
      })
      .catch((error) => {
        console.error("Error occurred while revoking delegation:", error);
      });
  };

  const renderWallet = (wallet, chainType) => (
    <div key={wallet.address} className="flex items-center gap-4 mb-2">
      <span>{wallet.address}</span>

      <button
        className={`px-4 py-2 rounded ${
          wallet.delegated
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 text-white"
        }`}
        onClick={() => setupDelegation(wallet.address, chainType)}
        disabled={wallet.delegated}
      >
        Set up delegation
      </button>

      {wallet.delegated && (
        <button
          className="px-4 py-2 bg-red-500 text-white rounded"
          onClick={revokeDelegation}
        >
          Revoke delegation
        </button>
      )}
    </div>
  );

  return (
    <div>
      <h3>Ethereum Wallets</h3>
      {ethereumWallets.length > 0 ? (
        ethereumWallets.map((wallet) => renderWallet(wallet, "ethereum"))
      ) : (
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded mb-4"
          onClick={createEthereumWallet}
        >
          Create Ethereum Wallet
        </button>
      )}

      <h3>Solana Wallets</h3>
      {solanaWallets.length > 0 ? (
        solanaWallets.map((wallet) => renderWallet(wallet, "solana"))
      ) : (
        <button
          className="px-4 py-2 bg-green-600 text-white rounded mb-4"
          onClick={createSolanaWallet}
        >
          Create Solana Wallet
        </button>
      )}

      <pre className="mt-4 p-2 bg-gray-100 text-sm overflow-x-auto">
        {JSON.stringify(user, null, 2)}
      </pre>
    </div>
  );
}

export default App;
