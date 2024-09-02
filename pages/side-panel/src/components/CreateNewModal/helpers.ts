type Component = {
  _id: string;
  name: string;
  domain?: string;
};

type Suggestion = {
  componentId: string;
  score: number;
  parent_componentId: string | null;
};

type Domain = {
  _id: string;
  name: string;
};

interface AppState {
  showDomain: boolean;
  components: Component[];
  mlComponentSuggestions: Suggestion[];
  domains: Domain[];
}

interface NewRequestForm {
  values: {
    domainId: string;
    disabledInputs: string[];
  };
}

interface SelectOption {
  label: string;
  value: string;
  isChild?: boolean;
}

export function prepareProductAreaData(appState: AppState, newRequestForm: NewRequestForm): SelectOption[] {
  const domainFilter = (component: Component) => {
    if (appState.showDomain) {
      const selectedDomain = appState.domains.find(domain => domain._id === newRequestForm.values.domainId);
      return selectedDomain?.name?.toLowerCase() === component?.domain?.toLowerCase();
    }
    return true;
  };

  // Filter and sort suggestions, considering the domain filter
  const suggestions = appState.mlComponentSuggestions
    .sort((a, b) => b.score - a.score)
    .filter((suggestion, index, self) => {
      const component = appState.components.find(comp => comp._id === suggestion.componentId);
      const parentExists = self.some(item => item.componentId === suggestion.parent_componentId);
      return component && domainFilter(component) && (!parentExists || suggestion.parent_componentId === null);
    })
    .slice(0, 3)
    .reduce<SelectOption[]>((acc, suggestion) => {
      const parentComponent = appState.components.find(comp => comp._id === suggestion.componentId);
      if (parentComponent) {
        acc.push({
          label: parentComponent.name,
          value: parentComponent._id,
        });
      }
      return acc;
    }, []);

  // Get regular components, excluding the ones already in suggestions and applying domain filter
  const regularComponents = appState.components
    .filter(component => domainFilter(component))
    .reduce<SelectOption[]>((acc, component) => {
      if (!suggestions.some(item => item.value === component._id)) {
        acc.push({
          label: component.name,
          value: component._id,
        });
      }
      return acc;
    }, []);

  return [...suggestions, ...regularComponents];
}
